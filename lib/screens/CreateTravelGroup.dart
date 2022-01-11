import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

import 'package:Splitlux/api/api.dart';
import 'package:Splitlux/constants.dart';
import 'package:Splitlux/utils.dart';
import 'package:Splitlux/screens/HomePage.dart';

class AddTravelGroup extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  late String name;
  final String jwt;
  final Map<String, dynamic> payload;
  bool isLoading=false;
  TextEditingController _nameContoller=new TextEditingController();
  GlobalKey<ScaffoldState>_scaffoldKey=GlobalKey();
  late ScaffoldMessengerState scaffoldMessenger ;

  AddTravelGroup(this.jwt, this.payload);

  factory AddTravelGroup.fromBase64(String jwt) =>
    AddTravelGroup(
      jwt,
      json.decode(
        ascii.decode(
          base64.decode(base64.normalize(jwt.split(".")[1]))
        )
      )
    );

    Future<String?> attemptCreate(String name) async {
    var res = await http.post(
      Uri.parse(CREATEGROUP),
      body: {
        "name": name
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
                    returnBackButton(context, "Create Travel Group", () => Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) =>  HomePage(jwt, payload))
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
                              controller: _nameContoller,
                              decoration: InputDecoration(
                                enabledBorder: UnderlineInputBorder(
                                    borderSide: BorderSide(color: Colors.white)),
                                hintText: "Group Name",
                                hintStyle: TextStyle(
                                    color: Colors.white70, fontSize: 15),
                              ),
                              onSaved: (val) {
                                name = val!;
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
                                    if(_nameContoller.text.isEmpty)
                                    {
                                      scaffoldMessenger.showSnackBar(SnackBar(content:Text("Please fill in the group name")));
                                      return;
                                    }
                                    var name = _nameContoller.text;
                                    var responseBody = await attemptCreate(name);
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
}