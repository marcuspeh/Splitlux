import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:unicorndial/unicorndial.dart';

import 'package:flutter/material.dart';

import 'package:Splitlux/api/api.dart';
import 'package:Splitlux/constants.dart';
import 'package:Splitlux/model/groupListModel.dart';
import 'package:Splitlux/screens/CreateTravelGroup.dart';
import 'package:Splitlux/screens/GroupView.dart';
import 'package:Splitlux/screens/JoinTravelGroup.dart';
import 'package:Splitlux/screens/SignInView.dart';
import 'package:Splitlux/utils.dart';

class HomePage extends StatelessWidget {
  final String jwt;
  final Map<String, dynamic> payload;

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

  @override
  Widget build(BuildContext context) {    
    return FutureBuilder(
          future: http.read(Uri.parse(GROUPLIST), headers: {"Authorization": "Bearer " + jwt}),
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.hasData) {
              return successRequest(context, snapshot.data);
            } else if (snapshot.hasError) {
              return errorReturnView(context, "Please sign in again", "Back to sign in", () {
                Navigator.of(context).push(MaterialPageRoute(builder: (_) => SignIn(),));
              });
            } else {
              return CircularProgressIndicator();
            }
          }
        );
  }

  Widget successRequest(BuildContext context, String data) {
    
    final Size size = MediaQuery.of(context).size;
    final floatingButtons = actionButtons(context);
    final jsonResponse = json.decode(data);
    GroupsList groupsList = GroupsList.fromJson(jsonResponse);

    return Scaffold(
      backgroundColor: purple,
      floatingActionButton: UnicornDialer(
        backgroundColor: Colors.black38,
        parentButtonBackground: Colors.brown,
        orientation: UnicornOrientation.VERTICAL,
        parentButton: Icon(Icons.add),
        childButtons: floatingButtons),
      body: Stack(
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
            top: 150,
            left: 20,
            child: billedContainer(context, size, groupsList),
          ),
        ]
      )
    ); 
  }

  Widget billedContainer(BuildContext context, Size size, GroupsList groupsList) {
    return Container(
      height: size.height - 180,  // 150 for top and 30 for bottom
      width: size.width - 40, // 20 for each side
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: orange,
      ),
      child: Stack(
        children: [
          travelGroupEntries(size, groupsList),
        ],
      ),
    );
  }

  Widget travelGroupEntries(Size size, GroupsList groupsList) {
    return ListView.builder(
        padding: const EdgeInsets.all(8),
        itemCount:  groupsList.groups.length,
        itemBuilder: (BuildContext context, int index) {
          return Container(
            height: 50,
            margin: EdgeInsets.fromLTRB(0, 0, 0, 10),
            child: GestureDetector(
              onTap: () => 
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => GroupView(this.jwt, this.payload, groupsList.groups[index].id, 
                    groupsList.groups[index].code, groupsList.groups[index].name, groupsList.groups[index].isClosed),
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
                    "(" + groupsList.groups[index].code + ") " + groupsList.groups[index].name,
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

  List<UnicornButton> actionButtons(BuildContext context) {
    List<UnicornButton> children = [];
    children.add(createButton(context));
    children.add(joinButton(context));
    return children;
  }

  UnicornButton createButton(BuildContext context) {
    return UnicornButton(
        hasLabel: true,
        labelText: "Create",
        currentButton: FloatingActionButton(
          heroTag: "createGroupBtn",
          backgroundColor: Colors.black,
          mini: true,
          child: Icon(Icons.create_sharp),
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => AddTravelGroup(this.jwt, this.payload),
              ));
            },
        ));
  }

  UnicornButton joinButton(BuildContext context) {
    return UnicornButton(
        hasLabel: true,
        labelText: "Join",
        currentButton: FloatingActionButton(
          heroTag: "joinGroupBtn",
          backgroundColor: Colors.black,
          mini: true,
          child: Icon(Icons.add),
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => JoinTravelGroup(this.jwt, this.payload),
              ));
            },
        ));
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
    return FutureBuilder(
          future: http.read(Uri.parse(USERDETAIL), headers: {"Authorization": "Bearer " + jwt}),
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.hasData) {
              Map<String,dynamic> response = jsonDecode(snapshot.data);
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
                      response["name"],
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: orange,
                      ),
                    )
                  ],
                ),
              );
            } else {
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
                    )
                  ],
                ),
              );
            }}
        );
        
  }
}
