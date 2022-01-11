import 'dart:convert';

import 'package:flutter/material.dart';

import 'package:Splitlux/constants.dart';
import 'package:Splitlux/model/groupDetailsModel.dart';
import 'package:Splitlux/screens/GroupView.dart';
import 'package:Splitlux/utils.dart';

class GroupMemberView extends StatelessWidget {
  GroupMemberView(this.jwt, this.payload, this.groupId, this.groupCode, this.groupName, this.members);

  factory GroupMemberView.fromBase64(String jwt, String groupId, String groupCode, String groupName, List<Member> members) =>
    GroupMemberView(
      jwt,
      json.decode(
        ascii.decode(
          base64.decode(base64.normalize(jwt.split(".")[1]))
        )
      ),
      groupId,
      groupCode,
      groupName,
      members
    );

  final String jwt;
  final Map<String, dynamic> payload;
  final String groupId;
  final String groupCode;
  final String groupName;
  final List<Member> members;


  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: purple,
      body: Stack(
        children: [
          Positioned(
            top: 50,
            left: 10,
            child: returnBackButton(context, "Members", () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => GroupView(jwt, payload, groupId, groupCode, groupName)),
              )
            ),
          ),
          Positioned(
            top: 90,
            left: 30,
            child: groupCodeText(),
          ),
          Positioned(
            top: 120,
            left: 21,
            child: billedContainer(size),
          ),
        ],
      ),
    );
  }

  Widget billedContainer(Size size) {
    return Container(
      height: size.height - 150,  // 120 for top and 30 for bottom
      width: size.width - 40, // 20 for each side
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: orange,
      ),
      child: Stack(
        children: [memberEntries(size)],
      ),
    );
  }
  

  Widget groupCodeText() {
    return Text("Group code ${groupCode}",
        style: TextStyle(
          color: orange,
          fontWeight: FontWeight.normal,
          fontSize: 15,
        ));
  }

  Widget memberEntries(Size size) {
    return ListView.builder(
        padding: const EdgeInsets.all(8),
        itemCount: members.length,
        itemBuilder: (BuildContext context, int index) {
          Member member = members[index];
          return Container(
            height: 50,
            margin: EdgeInsets.fromLTRB(0, 0, 0, 10),
            child: GestureDetector(
              onTap: () => {},
              child: Material(
                color: purple,
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  padding: EdgeInsets.fromLTRB(10, 0, 0, 0),
                  height: size.height / 14,
                  width: size.width / 1.5,
                  alignment: Alignment.centerLeft,
                  child: Text(
                    member.name,
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
}
