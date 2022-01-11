import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:Splitlux/api/api.dart';
import 'package:Splitlux/constants.dart';
import 'package:Splitlux/screens/HomePage.dart';
import 'package:Splitlux/utils.dart';

class JoinTravelGroup extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  late String groupCode;
  bool isLoading=false;
  TextEditingController _groupCodeContoller=new TextEditingController();
  GlobalKey<ScaffoldState>_scaffoldKey=GlobalKey();
  late ScaffoldMessengerState scaffoldMessenger;
  final String jwt;
  final Map<String, dynamic> payload;

  JoinTravelGroup(this.jwt, this.payload);

  factory JoinTravelGroup.fromBase64(String jwt) =>
    JoinTravelGroup(
      jwt,
      json.decode(
        ascii.decode(
          base64.decode(base64.normalize(jwt.split(".")[1]))
        )
      )
    );

    Future<String?> attemptJoin(String groupCode) async {
    var res = await http.put(
      Uri.parse(JOINGROUP),
      body: {
        "group_id": groupCode
      },
      headers: {"Authorization": "Bearer " + jwt}
    );
    return "${res.statusCode} ${res.body}";
  }


  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: purple,
      key: _scaffoldKey,
      body: SingleChildScrollView(
        child: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          child: Stack(
            children: <Widget>[
              Container(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    returnBackButton(context, "Join a Travel Group", () => Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) => HomePage(jwt, payload))
                    )),
                    SizedBox(
                      height: 8,
                    ),
                    Form(
                      key: _formKey,
                      child: Container(
                        margin:
                            EdgeInsets.symmetric(vertical: 10, horizontal: 45),
                        child: Column(
                          children: <Widget>[
                            TextFormField(
                              style: TextStyle(
                                color: Colors.white,
                              ),
                              controller: _groupCodeContoller,
                              decoration: InputDecoration(
                                enabledBorder: UnderlineInputBorder(
                                    borderSide: BorderSide(color: Colors.white)),
                                hintText: "Group Code",
                                hintStyle: TextStyle(
                                    color: Colors.white70, fontSize: 15),
                              ),
                              onSaved: (val) {
                                groupCode = val!;
                              },
                            ),
                            SizedBox(
                              height: 30,
                            ),
                            Stack(
                              children: [
                                GestureDetector(
                                  onTap: () async {
                                    if(isLoading)
                                      {
                                        return;
                                      }
                                    if(_groupCodeContoller.text.isEmpty)
                                    {
                                      scaffoldMessenger.showSnackBar(SnackBar(content:Text("Please fill in the group groupCode")));
                                      return;
                                    }
                                    var groupCode = _groupCodeContoller.text;
                                    var response = await attemptJoin(groupCode);
                                    if (response != null) {
                                      var responseHeader = response.substring(0, 3);
                                      if (responseHeader == "201") {
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) => HomePage(jwt, payload)
                                          ));
                                      } else if (responseHeader == "404") {
                                        displayDialog(context, "An Error Occurred", "Group cannot be found");
                                      } else {
                                        var responseBody = response.substring(4);
                                        Map<String,dynamic> responseMap = jsonDecode(responseBody);
                                        displayDialog(context, "An Error Occurred", (responseMap["error"] != null) ? responseMap['error'] : "Please try again");
                                        
                                      }
                                    } else {
                                      displayDialog(context, "An Error Occurred", "Please try again");
                                    }
                                  },
                                  child: Container(
                                    alignment: Alignment.center,
                                    width: double.infinity,
                                    padding: EdgeInsets.symmetric(
                                        vertical: 10, horizontal: 0),
                                    height: 50,
                                    decoration: BoxDecoration(
                                      border: Border.all(color: Colors.white),
                                      borderRadius: BorderRadius.circular(50),
                                    ),
                                    child: Text(
                                      "SUBMIT",
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 16,
                                              letterSpacing: 1)),
                                  ),
                                ),
                                Positioned(child: (isLoading)?Center(child: Container(height:26,width: 26,child: CircularProgressIndicator(backgroundColor: Colors.green,))):Container(),right: 30,bottom: 0,top: 0,)

                              ],
                            )

                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
        ),
      ),
    ));
  }
}