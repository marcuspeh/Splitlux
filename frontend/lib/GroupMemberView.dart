import 'package:flutter/material.dart';
import 'package:frontend/constants.dart';

var exampleData = [
  'Tom Jeffrey',
  'Richard Mile',
  'Rachel Sim',
  'Grace Holland',
  'Tom Xavier',
  'Vanessa Yap',
  'Dominic Chai',
  'Crystal Jen',
  'Marcus Tan',
  'John Foo',
  'Arabelle Chua',
];

class GroupMemberView extends StatefulWidget {
  @override
  _GroupMemberViewState createState() => _GroupMemberViewState();
}

class _GroupMemberViewState extends State<GroupMemberView> {
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
            child: groupNameAndBack(),
          ),
          Positioned(
            top: 90,
            left: 30,
            child: groupCode(),
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
      height: size.height / 1.28,
      width: size.width / 1.11,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: orange,
      ),
      child: Stack(
        children: [travelGroupEntries(size)],
      ),
    );
  }

  Widget groupNameAndBack() {
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
                        builder: (_) => GroupMemberView(),
                      ),
                    ),
                child: Icon(Icons.arrow_back)),
          )),
          TextSpan(text: 'Members'),
        ],
      ),
    );
  }

  String placeholderText = "aowd495";

  Widget groupCode() {
    return Text("Group code ${placeholderText}",
        style: TextStyle(
          color: orange,
          fontWeight: FontWeight.normal,
          fontSize: 15,
        ));
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
                  builder: (_) => GroupMemberView(),
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
}
