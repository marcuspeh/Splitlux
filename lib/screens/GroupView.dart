import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:Splitlux/api/api.dart';
import 'package:Splitlux/constants.dart';
import 'package:Splitlux/model/groupDetailsModel.dart';
import 'package:Splitlux/screens/GroupMemberView.dart';
import 'package:Splitlux/screens/GroupTransactionView.dart';
import 'package:Splitlux/screens/HomePage.dart';
import 'package:Splitlux/utils.dart';


class GroupView extends StatelessWidget {
  final String jwt;
  final Map<String, dynamic> payload;
  final String groupId;
  final String groupCode;
  final String groupName;
  final bool isClosed;

  GroupView(this.jwt, this.payload, this.groupId, this.groupCode, this.groupName, this.isClosed);

  factory GroupView.fromBase64(
          String jwt, String groupId, String groupCode, String groupName, bool isClosed) =>
      GroupView(
          jwt,
          json.decode(
              ascii.decode(base64.decode(base64.normalize(jwt.split(".")[1])))),
          groupId,
          groupCode,
          groupName,
          isClosed
          );

  Future<String?> attemptDeleteTransaction(String id) async {
    var res = await http.delete(
      Uri.parse(DELETETRANSACTION + "${id}/"),
      headers: {"Authorization": "Bearer " + jwt}
    );
    if(res.statusCode == 200) return res.body;
    return "${res.statusCode} ${res.body}";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: purple,
      body: FutureBuilder(
          future: http.read(Uri.parse(GROUPDETAILS + this.groupId + "/"),
              headers: {"Authorization": "Bearer " + jwt}),
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.hasData) {
              return successRequest(context, snapshot.data);
            } else if (snapshot.hasError) {
              return errorReturnView(context, "An error occured", "Return to home page", () {
                Navigator.of(context).push(MaterialPageRoute(builder: (_) =>HomePage(jwt, payload)));
              });
            } else {
              return CircularProgressIndicator();
            }
          })
    );
  }

  Widget successRequest(BuildContext context, String data) {
    final Size size = MediaQuery.of(context).size;

    final jsonResponse = json.decode(data);
    GroupDetails groupDetails = new GroupDetails.fromJson(jsonResponse);
    return Scaffold(
      backgroundColor: purple,
      body: Stack(
        children: [
          Positioned(
            top: 50,
            left: 10,
            child: returnBackButton(context, groupName, () => Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => HomePage(jwt, payload))
            )),
          ),
          Positioned(
            top: 50,
            right: 10,
            child: membershipStatus(context, groupDetails.members),
          ),
          Positioned(
            top: 90,
            left: 30,
            child: groupCodeText(groupCode),
          ),
          Positioned(
            top: 120,
            left: 21,
            child: billedContainer(context, size, groupDetails.transactions),
          ),
        ],
      )
    );
  }

  Widget billedContainer(BuildContext context, Size size, List<Transaction> transactions) {
    return Container(
      height: size.height - 150,  // 120 for top and 30 for bottom
      width: size.width - 40, // 20 for each side
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: orange,
      ),
      child: Stack(
        children: [
          Positioned(
            top: 10,
            left: 11,
            child: addTransactions(context),
          ),
          Container(
            child: transactionEntries(size, transactions),
            margin: EdgeInsets.fromLTRB(0, 50, 0, 0),
          )
        ],
      ),
    );
  }

  Widget membershipStatus(BuildContext context, List<Member> members) {
    return ElevatedButton(
      style: ButtonStyle(backgroundColor: MaterialStateProperty.all(darkPurple)),      
      onPressed: () => Navigator.of(context).push(
        MaterialPageRoute(
          builder: (_) => GroupMemberView(
              jwt, payload, groupId, groupCode, groupName, members, isClosed),
        ),
      ),
      child: Text(
        "${members.length} members",
        style: const TextStyle(
              color: orange,
              fontSize: 16
            ),
      ),
    );
  }

  Widget groupCodeText(String groupCode) {
    if (isClosed) {
      return Text("Group closed",
        style: const TextStyle(
          color: orange,
          fontWeight: FontWeight.normal,
          fontSize: 18,
        ));
    } else {
      return Text("Group code $groupCode",
        style: const TextStyle(
          color: orange,
          fontWeight: FontWeight.normal,
          fontSize: 18,
        ));
    }
    
  }

  Widget transactionEntries(Size size, List<Transaction> transactions) {
    return ListView.builder(
        padding: const EdgeInsets.all(8),
        itemCount: transactions.length,
        itemBuilder: (BuildContext context, int index) {
          Transaction transaction = transactions[index];
          return Container(
            height: 50,
            margin: const EdgeInsets.fromLTRB(0, 0, 0, 10),
            child: GestureDetector(
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => HomePage(jwt, payload),
                ),
              ),
              child: Material(
                color: purple,
                borderRadius: BorderRadius.circular(20),
                child: Container(
                    padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                    height: size.height / 14,
                    width: size.width / 1.5,
                    alignment: Alignment.centerLeft,
                    child: listEntry(context, transaction)
                    ),
              ),
            ),
          );
        });
  }

  Widget listEntry(BuildContext context, Transaction transaction) {
    if (isClosed) {
      return Text(
          "(\$${transaction.amount}) ${transaction.title}",
          style: const TextStyle(
            color: orange,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        );
    } else {
      return Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            "(\$${transaction.amount}) ${transaction.title}",
            style: const TextStyle(
              color: orange,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          Container(
              height: 20.0,
              width: 20.0,
              margin: const EdgeInsets.fromLTRB(0, 0, 10, 0),
              child: FittedBox(
                  child: FloatingActionButton(
                heroTag: "removeTransactionBtn" + transaction.id,
                backgroundColor: Colors.red,
                onPressed: () async {
                  var response = await attemptDeleteTransaction(transaction.id);
                  if (response != null) {
                    var responseHeader = response.substring(0, 3);
                    if (responseHeader == "400") {
                      var responseBody = response.substring(4);
                      Map<String,dynamic> responseMap = jsonDecode(responseBody);
                      displayDialog(context, "An Error Occurred", responseMap["error"]);
                    } else {
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (_) => GroupView(jwt, payload, groupId, groupCode, groupName, isClosed)));
                    }
                  } else {
                    displayDialog(context, "An Error Occurred", "Please try again");
                  }
                },
                child: const Icon(Icons.remove),
              ))),
        ]);
    }
  }

  Widget addTransactions(BuildContext context) {
    if (isClosed) {
      return transactionsText();
    } else {
      return Row(children: [transactionsText(), addButton(context)]);
    }  
  }

  Widget transactionsText() {
    return const Text("Transactions",
        style: TextStyle(
          color: darkPurple,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ));
  }

  Widget addButton(BuildContext context) {
    return Container(
        height: 30.0,
        width: 30.0,
        child: FittedBox(
            child: FloatingActionButton(
          heroTag: "addGroupBtn",
          onPressed: () => Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => GroupTransactionView(jwt, payload, groupId, groupCode, groupName, isClosed),
                      ),
                    ),
          child: const Icon(Icons.add),
        )));
  }
}
