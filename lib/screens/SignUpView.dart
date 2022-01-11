import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:Splitlux/api/api.dart';
import 'package:Splitlux/screens/SignInView.dart';
import 'package:Splitlux/utils.dart';

import 'package:http/http.dart' as http;

import 'package:Splitlux/screens/HomePage.dart';

import '../constants.dart';

class SignUp extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  late String name, email, password, password2;
  bool isLoading=false;
  GlobalKey<ScaffoldState>_scaffoldKey=GlobalKey();
  late ScaffoldMessengerState scaffoldMessenger ;
  var reg=RegExp(r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+");

  TextEditingController _nameController=new TextEditingController();
  TextEditingController _emailController=new TextEditingController();
  TextEditingController _passwordController=new TextEditingController();
  TextEditingController _passwordController2=new TextEditingController();

  Future<int> attemptSignUp(String username, String email, String password, String password2) async {
    var res = await http.post(
      Uri.parse(REGISTRATION),
      body: {
        "name": username,
        "email": email,
        "password": password,
        "re_password": password2
      }
    );
    return res.statusCode;
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
                  Center(
                     child: Text(
                        "SplitLux",
                        style: TextStyle(
                          color: orange,
                          fontWeight: FontWeight.bold,
                          fontSize: 30,
                        ),
                      ),
                  ),
                  SizedBox(
                    height: 40,
                  ),
                  Text(
                    "Sign Up",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        color: Colors.white,
                        letterSpacing: 1,
                        fontSize: 23,
                      ),
                  ),
                  SizedBox(
                    height: 30,
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
                            controller: _nameController,

                            decoration: InputDecoration(

                              enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white)),
                              hintText: "Name",
                              hintStyle: TextStyle(
                                  color: Colors.white70, fontSize: 15),
                            ),
                            onSaved: (val) {
                              name = val!;
                            },
                          ),
                          SizedBox(
                            height: 16,
                          ),
                          TextFormField(
                            style: TextStyle(
                              color: Colors.white,
                            ),
                            controller: _emailController,

                            decoration: InputDecoration(

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
                          SizedBox(
                            height: 16,
                          ),
                          TextFormField(
                            style: TextStyle(
                              color: Colors.white,
                            ),
                            controller: _passwordController,
                            decoration: InputDecoration(
                              enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white)),
                              hintText: "Password",
                              hintStyle: TextStyle(
                                  color: Colors.white70, fontSize: 15),
                            ),
                            onSaved: (val) {
                              password = val!;
                            },
                          ),
                          SizedBox(
                            height: 16,
                          ),
                          TextFormField(
                            style: TextStyle(
                              color: Colors.white,
                            ),
                            controller: _passwordController2,
                            decoration: InputDecoration(
                              enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white)),
                              hintText: "Enter your password again",
                              hintStyle: TextStyle(
                                  color: Colors.white70, fontSize: 15),
                            ),
                            onSaved: (val) {
                              password2 = val!;
                            },
                          ),
                          SizedBox(
                            height: 30,
                          ),
                          Stack(
                            children: [
                              Container(
                                alignment: Alignment.center,
                                width: double.infinity,
                                padding: EdgeInsets.symmetric(
                                    vertical: 10, horizontal: 0),
                                height: 50,
                                decoration: BoxDecoration(
                                  border: Border.all(color: Colors.white),
                                  borderRadius: BorderRadius.circular(50),
                                ),
                                child: InkWell(
                                  onTap: () async {
                                    if(isLoading)
                                    {
                                      return;
                                    }
                                    if(_nameController.text.isEmpty)
                                    {
                                      scaffoldMessenger.showSnackBar(SnackBar(content:Text("Please Enter Name")));
                                      return;
                                    }
                                    if(!reg.hasMatch(_emailController.text))
                                    {
                                      scaffoldMessenger.showSnackBar(SnackBar(content:Text("Enter Valid Email")));
                                      return;
                                    }
                                    if(_passwordController.text.isEmpty||_passwordController.text.length<6)
                                    {
                                      scaffoldMessenger.showSnackBar(SnackBar(content:Text("Password should be min 6 characters")));
                                      return;
                                    }
                                    if(_passwordController2.text.isEmpty)
                                    {
                                      scaffoldMessenger.showSnackBar(SnackBar(content:Text("Enter your password again")));
                                      return;
                                    }
                                    if(_passwordController2.text != _passwordController.text)
                                    {
                                      scaffoldMessenger.showSnackBar(SnackBar(content:Text("Enter your password again")));
                                      return;
                                    }
                                    var res = await attemptSignUp(_nameController.text, _emailController.text, _passwordController.text, _passwordController2.text);
                                    if(res == 201)
                                      displayDialog(context, "Success", "The user was created. Log in now.");
                                    else if(res == 409)
                                      displayDialog(context, "That username is already registered", "Please try to sign up using another username or log in if you already have an account.");  
                                    else 
                                      displayDialog(context, "Error", "An unknown error occurred.");
                                  },
                                  child: Text(
                                    "CREATE ACCOUNT",
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
                  SizedBox(
                    height: 20,
                  ),
                  GestureDetector(
                    onTap: () => Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => SignIn(),
                        ),
                      ),        
                    child: Text(
                      "Already have an account?",
                      style: TextStyle(
                              color: Colors.white70,
                              fontSize: 13,
                              decoration: TextDecoration.underline,
                              letterSpacing: 0.5)),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    ));
  }
}