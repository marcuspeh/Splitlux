import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:Splitlux/HomePage.dart';
import 'package:Splitlux/api/api.dart';
import 'package:http/http.dart' as http;
import 'package:Splitlux/constants.dart';

class JoinTravelGroup extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  late String groupCode;

  bool isLoading=false;
  TextEditingController _groupCodeContoller=new TextEditingController();
  GlobalKey<ScaffoldState>_scaffoldKey=GlobalKey();
  late ScaffoldMessengerState scaffoldMessenger ;

  JoinTravelGroup(this.jwt, this.payload);

  void displayDialog(context, title, text) => showDialog(
    context: context,
    builder: (context) =>
      AlertDialog(
        title: Text(title),
        content: Text(text)
      ),
  );

  factory JoinTravelGroup.fromBase64(String jwt) =>
    JoinTravelGroup(
      jwt,
      json.decode(
        ascii.decode(
          base64.decode(base64.normalize(jwt.split(".")[1]))
        )
      )
    );

  final String jwt;
  final Map<String, dynamic> payload;

    Future<String?> attemptCreate(String groupCode) async {
    var res = await http.post(
      Uri.parse(CREATEGROUP),
      body: {
        "group_id": groupCode
      },
      headers: {"Authorization": "Bearer " + jwt}
    );
    if(res.statusCode == 201) return res.body;
    return null;
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
                    Positioned(
                      top: 50,
                      left: 10,
                      child: groupNameAndBack(context),
                    ),
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
                                    var responseBody = await attemptCreate(groupCode);
                                    if (responseBody != null) {
                                      Map<String,dynamic> response = jsonDecode(responseBody);
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => HomePage(jwt, payload)
                                        )
                                      );
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

  Widget groupNameAndBack(BuildContext context) {
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
                onTap: () => Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => HomePage(jwt, payload),
                      ),
                    ),
                child: Icon(Icons.arrow_back)),
          )),
          TextSpan(text: 'Join a Travel Group'),
        ],
      ),
    );
  }
  }