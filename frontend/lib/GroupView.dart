import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:frontend/HomePage.dart';
import 'package:frontend/GroupMemberView.dart';
import 'package:frontend/api/api.dart';
import 'package:frontend/constants.dart';
import 'package:frontend/model/groupDetailsModel.dart';
import 'package:http/http.dart' as http;

var exampleData = [
  'Munich',
  'Prague',
  'London',
  'Czech Republic',
  'Paris',
  'France',
  'Dominican Republic',
  'Tokyo',
  'Osaka',
  'Kyoto',
  'Saitama',
];

class GroupView extends StatelessWidget {
  GroupView(this.jwt, this.payload, this.groupId, this.groupCode, this.groupName);

  factory GroupView.fromBase64(String jwt, String groupId, String groupCode, String groupName) =>
    GroupView(
      jwt,
      json.decode(
        ascii.decode(
          base64.decode(base64.normalize(jwt.split(".")[1]))
        )
      ),
      groupId,
      groupCode,
      groupName
    );

  final String jwt;
  final Map<String, dynamic> payload;
  final String groupId;
  final String groupCode;
  final String groupName;

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: purple,
      body: FutureBuilder(
        future: http.read(Uri.parse(GROUPDETAILS + this.groupId + "/"), headers: {"Authorization": "Bearer " + jwt}),
        builder: (BuildContext context, AsyncSnapshot snapshot) {          
          if (snapshot.hasData) {
            final jsonResponse = json.decode(snapshot.data);
            GroupDetails groupDetails = new GroupDetails.fromJson(jsonResponse);
            return Stack(
              children: [
                Positioned(
                  top: 50,
                  left: 10,
                  child: groupNameAndBack(context, groupName),
                ),
                Positioned(
                  top: 30,
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
                  child: billedContainer(size, groupDetails.transactions),
                ),
              ],
            );
          } else if (snapshot.hasError) {
            return Stack(
              children: [
                Center(child:Container(
                  padding: EdgeInsets.fromLTRB(20, 20, 20, 20),
                  margin: EdgeInsets.fromLTRB(0, 0, 0, 100),
                  child:Text("An error occurred",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        letterSpacing: 1,
                        fontSize: 23,
                      ),
                  ))),
              
                Center(child:Container(
                  padding: EdgeInsets.fromLTRB(20, 20, 20, 20),
                  child:FittedBox(
                        child: FloatingActionButton.extended(
                          heroTag: "returnHomePageBtn",
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => HomePage(this.jwt, this.payload),
                          ));
                      },
                      backgroundColor: orange,
                      label: Text("Continue"),
                    )))),
                ]);
            } else {
              return CircularProgressIndicator();
            }
    }));
  }

  Widget billedContainer(Size size, List<Transaction> transactions) {
    return Container(
      height: size.height / 1.28,
      width: size.width / 1.11,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: orange,
      ),
      child: Stack(
        children: [
          Positioned(
            top: 10,
            left: 11,
            child: addTransactions(),
          ),
          Container(
            child: transactionEntries(size, transactions),
            margin: EdgeInsets.fromLTRB(0, 50, 0, 0),
          )
        ],
      ),
    );
  }

  Widget groupNameAndBack(BuildContext context, String groupName) {
    return RichText(
      text: TextSpan(
        style: TextStyle(
          color: orange,
          fontWeight: FontWeight.bold,
          fontSize: 30,
        ),
        children: [
          WidgetSpan(
              child: Container(
            child: GestureDetector(
                onTap: () => 
                Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => HomePage(this.jwt, this.payload),
                )),
                child: Icon(Icons.arrow_back)),
          )),
          TextSpan(text: groupName),
        ],
      ),
    );
  }

  Widget membershipStatus(BuildContext context, List<Member> members) {
    return Container(
        height: 80.0,
        width: 80.0,
        child: FittedBox(
            child: FloatingActionButton.extended(
          heroTag: "membershipBtn",
          onPressed: () => Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => GroupMemberView(jwt, payload, groupId, groupCode, groupName, members),
              ),
            ),
          label: Text("${members.length} members"),
        )));
  }

  Widget groupCodeText(String groupCode) {
    return Text("Group code ${groupCode}",
        style: TextStyle(
          color: orange,
          fontWeight: FontWeight.normal,
          fontSize: 15,
        ));
  }

  Widget transactionEntries(Size size, List<Transaction> transactions) {
    return ListView.builder(
        padding: const EdgeInsets.all(8),
        itemCount: transactions.length,
        itemBuilder: (BuildContext context, int index) {
          Transaction transaction = transactions[index];
          return Container(
            height: 50,
            margin: EdgeInsets.fromLTRB(0, 0, 0, 10),
            child: GestureDetector(
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => HomePage(this.jwt, this.payload),
                ),
              ),
              child: Material(
                color: purple,
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  padding: EdgeInsets.fromLTRB(10, 0, 0, 0),
                  height: size.height / 14,
                  width: size.width / 1.5,
                  alignment: Alignment.centerLeft,
                  child: Text(
                    "(\$${transaction.amount}) ${transaction.title}",
                    style: TextStyle(
                      color: orange,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
          );
        });
  }

  Widget addTransactions() {
    return Row(children: [transactionsText(), addButton()]);
  }

  Widget transactionsText() {
    return Text("Transactions",
        style: TextStyle(
          color: darkPurple,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ));
  }

  Widget addButton() {
    return Container(
        height: 30.0,
        width: 30.0,
        child: FittedBox(
            child: FloatingActionButton(
              heroTag: "addGroupBtn",
          onPressed: () {},
          child: Icon(Icons.add),
        )));
  }
}
