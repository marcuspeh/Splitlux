import 'package:flutter/material.dart';
import 'package:frontend/constants.dart';

var exampleData = [
  'Munich',
  'Prague',
  'London',
  'Czech Republic',
  'Paris',
  'France',
  'Dominican Republic',
  'Tokyo',
  'Osaka',
  'Kyoto',
  'Saitama',
];

class GroupView extends StatefulWidget {
  @override
  _GroupViewState createState() => _GroupViewState();
}

class _GroupViewState extends State<GroupView> {
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
            top: 30,
            right: 10,
            child: membershipStatus(),
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
        children: [
          Positioned(
            top: 10,
            left: 11,
            child: transactions(),
          ),
          Container(
            child: travelGroupEntries(size),
            margin: EdgeInsets.fromLTRB(0, 50, 0, 0),
          )
        ],
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
                        builder: (_) => GroupView(),
                      ),
                    ),
                child: Icon(Icons.arrow_back)),
          )),
          TextSpan(text: 'Germany'),
        ],
      ),
    );
  }

  Widget membershipStatus() {
    return Container(
        height: 80.0,
        width: 80.0,
        child: FittedBox(
            child: FloatingActionButton.extended(
          heroTag: "membershipBtn",
          onPressed: () {},
          label: Text("3 members"),
        )));
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
                  builder: (_) => GroupView(),
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

  Widget transactions() {
    return Row(children: [transactionsText(), addButton()]);
  }

  Widget transactionsText() {
    return Text("Transactions",
        style: TextStyle(
          color: darkPurple,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ));
  }

  Widget addButton() {
    return Container(
        height: 30.0,
        width: 30.0,
        child: FittedBox(
            child: FloatingActionButton(
          onPressed: () {},
          child: Icon(Icons.add),
        )));
  }
}
