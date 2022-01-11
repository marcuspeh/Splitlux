import 'dart:convert';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:Splitlux/api/api.dart';
import 'package:Splitlux/constants.dart';
import 'package:Splitlux/main.dart';
import 'package:Splitlux/screens/HomePage.dart';
import 'package:Splitlux/screens/SignUpView.dart';
import 'package:Splitlux/utils.dart';


class SignIn extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  late String email, password;
  bool isLoading=false;
  TextEditingController _emailController=new TextEditingController();
  TextEditingController _passwordController=new TextEditingController();
  GlobalKey<ScaffoldState>_scaffoldKey=GlobalKey();
  late ScaffoldMessengerState scaffoldMessenger ;

  Future<String?> attemptLogIn(String username, String password) async {
    var res = await http.post(
      Uri.parse(LOGIN),
      body: {
        "email": username,
        "password": password
      }
    );
    return "${res.statusCode} ${res.body}";
  }


  @override
  Widget build(BuildContext context) {
    scaffoldMessenger = ScaffoldMessenger.of(context);
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
                    const Center(
                      child: Text(
                        "SplitLux",
                        style: TextStyle(
                          color: orange,
                          fontWeight: FontWeight.bold,
                          fontSize: 30,
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 40,
                    ),
                    const Text(
                      "Sign In",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          color: Colors.white,
                          letterSpacing: 1,
                          fontSize: 23,
                        ),
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    Form(
                      key: _formKey,
                      child: Container(
                        margin:
                            const EdgeInsets.symmetric(vertical: 10, horizontal: 45),
                        child: Column(
                          children: <Widget>[
                            TextFormField(
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                              controller: _emailController,
                              decoration: const InputDecoration(
                                enabledBorder: UnderlineInputBorder(
                                    borderSide: BorderSide(color: Colors.white)),
                                hintText: "Email",
                                hintStyle: TextStyle(
                                    color: Colors.white70, fontSize: 15),
                              ),
                              onSaved: (val) {
                                email = val!;
                              },
                            ),
                            const SizedBox(
                              height: 16,
                            ),
                            TextFormField(
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                              controller: _passwordController,
                              decoration: const InputDecoration(
                                enabledBorder: UnderlineInputBorder(
                                    borderSide: BorderSide(color: Colors.white)),
                                hintText: "Password",
                                hintStyle: TextStyle(
                                    color: Colors.white70, fontSize: 15),
                              ),
                              onSaved: (val) {
                                email = val!;
                              },
                            ),
                            const SizedBox(
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
                                    if(_emailController.text.isEmpty||_passwordController.text.isEmpty)
                                    {
                                      scaffoldMessenger.showSnackBar(const SnackBar(content:const Text("Please Fill all fileds")));
                                      return;
                                    }
                                    var username = _emailController.text;
                                    var password = _passwordController.text;
                                    var response = await attemptLogIn(username, password);
                                    if (response != null) {
                                      var responseHeader = response.substring(0, 3);
                                      var responseBody = response.substring(4);
                                      Map<String,dynamic> responseMap = jsonDecode(responseBody);

                                      if (responseHeader == "200") {
                                        var jwt = responseMap['access'];
                                        var refresh = responseMap['refresg'];
                                        storage.write(key: "jwt", value: jwt);
                                        storage.write(key: "refresh_token", value: refresh);
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) => HomePage.fromBase64(jwt)
                                          )
                                        );
                                      } else {
                                        displayDialog(context, "An Error Occurred", (responseMap["error"] != null) ? responseMap['error'] : "Please try again");
                                      }
                                    } else {
                                      displayDialog(context, "An Error Occurred", "No account was found matching that username and password");
                                    }
                                  },
                                  child: Container(
                                    alignment: Alignment.center,
                                    width: double.infinity,
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 10, horizontal: 0),
                                    height: 50,
                                    decoration: BoxDecoration(
                                      border: Border.all(color: Colors.white),
                                      borderRadius: BorderRadius.circular(50),
                                    ),
                                    child: const Text(
                                      "SUBMIT",
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 16,
                                              letterSpacing: 1)),
                                  ),
                                ),
                                Positioned(child: (isLoading)?Center(child: Container(height:26,width: 26,child: const CircularProgressIndicator(backgroundColor: Colors.green,))):Container(),right: 30,bottom: 0,top: 0,)

                              ],
                            )

                          ],
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    const Text(
                      "OR",
                      style: TextStyle(fontSize: 14, color: Colors.white60),
                    ),
                    const SizedBox(
                      height: 30,
                    ),
                    GestureDetector(
                      onTap: () => Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => SignUp(),
                        ),
                      ),                      
                      child: const Text(
                        "Don't have an account?",
                        style: TextStyle(
                                color: Colors.white70,
                                fontSize: 13,
                                decoration: TextDecoration.underline,
                                letterSpacing: 0.5)),
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

