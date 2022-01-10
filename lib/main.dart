import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:Splitlux/GroupTransactionView.dart';
import 'package:Splitlux/screens/SignInView.dart';
import 'package:Splitlux/HomePage.dart';
import 'package:Splitlux/api/api.dart';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  Future<String> get jwtOrEmpty async {
    var jwt = await storage.read(key: "jwt");
    if (jwt == null) return "";
    return jwt;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Splitlux',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: FutureBuilder(
          future: jwtOrEmpty,
          builder: (context, snapshot) {
            if (!snapshot.hasData) return CircularProgressIndicator();
            if (snapshot.data != "") {
              var str = snapshot.data.toString();
              var jwt = str.split(".");

              if (jwt.length != 3) {
                return SignIn();
              } else {
                var payload = json.decode(
                    ascii.decode(base64.decode(base64.normalize(jwt[1]))));
                if (DateTime.fromMillisecondsSinceEpoch(payload["exp"] * 1000)
                    .isAfter(DateTime.now())) {
                  return HomePage(str, payload);
                } else {
                  return SignIn();
                }
              }
            } else {
              return SignIn();
            }
          }),
    );
  }
}
