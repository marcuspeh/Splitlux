import 'dart:convert';

import 'package:frontend/api/api.dart';
import 'package:flutter/material.dart';
import 'package:frontend/constants.dart';
import 'package:http/http.dart' as http;

var exampleData = ['Munich', 'Prague', 'London'];

class HomePage extends StatelessWidget {
  HomePage(this.jwt, this.payload);

  factory HomePage.fromBase64(String jwt) =>
    HomePage(
      jwt,
      json.decode(
        ascii.decode(
          base64.decode(base64.normalize(jwt.split(".")[1]))
        )
      )
    );

  final String jwt;
  final Map<String, dynamic> payload;

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    print(jwt);
    return Scaffold(
      backgroundColor: purple,
      body: FutureBuilder(
          future: http.read(Uri.parse(GROUPLIST), headers: {"Authorization": "Bearer " + jwt}),
          builder: (context, snapshot) =>
            snapshot.hasData ? Stack(
        children: [
          Positioned(
            top: 70,
            left: 30,
            child: Text(
              "SplitLux",
              style: TextStyle(
                color: orange,
                fontWeight: FontWeight.bold,
                fontSize: 30,
              ),
            ),
          ),
          Positioned(
            top: 50,
            right: 30,
            child: profilePicture(size),
          ),
          Positioned(
            top: 155,
            left: 21,
            child: billedContainer(size),
          ),
        ],
      ):
            snapshot.hasError ? Text("An error occurred") : CircularProgressIndicator()
        ),
    );
  }

  Widget billedContainer(Size size) {
    return Container(
      height: size.height / 1.35,
      width: size.width / 1.11,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: orange,
      ),
      child: Stack(
        children: [
          travelGroupEntries(size),
          Positioned(bottom: 10, right: 30, child: actionButtons())
        ],
      ),
    );
  }

  Widget travelGroupEntries(Size size) {
    return ListView.builder(
        padding: const EdgeInsets.all(8),
        itemCount: exampleData.length,
        itemBuilder: (BuildContext context, int index) {
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
                    exampleData[index],
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

  Widget actionButtons() {
    return Container(
        height: 150,
        child: Column(
          children: [
            createButton(),
            joinButton(),
          ],
        ));
  }

  Widget createButton() {
    return Container(
        height: 80.0,
        width: 80.0,
        child: FittedBox(
            child: FloatingActionButton.extended(
          onPressed: () {},
          label: Text("Create"),
        )));
  }

  Widget joinButton() {
    return Container(
        height: 70.0,
        width: 70.0,
        child: FittedBox(
            child: FloatingActionButton.extended(
          onPressed: () {},
          label: Text("Join"),
        )));
  }

  Widget image(Size size, String imageUrl) {
    return Container(
      height: size.height / 10,
      width: size.width / 10,
      decoration: BoxDecoration(
          shape: BoxShape.circle,
          image: DecorationImage(
            image: AssetImage(imageUrl),
            fit: BoxFit.contain,
          )),
    );
  }

  Widget profilePicture(Size size) {
    return Container(
      height: size.height / 9.5,
      width: size.width / 4.5,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: darkPurple,
      ),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(5.0),
            child: Container(
              height: size.height / 19,
              width: size.width / 5,
              decoration: BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage("resources/images/chatbot.png"))),
            ),
          ),
          Text(
            "User 1",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: orange,
            ),
          )
        ],
      ),
    );
  }
}
