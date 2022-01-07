import 'package:flutter/material.dart';
import 'package:frontend/constants.dart';

class AddTravelGroup extends StatefulWidget {
  @override
  _AddTravelGroupState createState() => _AddTravelGroupState();
}

class _AddTravelGroupState extends State<AddTravelGroup> {
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
          Container(
            child: form(),
            margin: EdgeInsets.fromLTRB(20, 100, 0, 0),
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
                        builder: (_) => AddTravelGroup(),
                      ),
                    ),
                child: Icon(Icons.arrow_back)),
          )),
          TextSpan(text: 'Create a Travel Group'),
        ],
      ),
    );
  }

  Widget form() {
    return Form(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          TextFormField(
            decoration: const InputDecoration(
              icon: const Icon(
                Icons.group,
                color: orange,
              ),
              hintText: 'Enter group name',
              hintStyle: TextStyle(fontSize: 15.0, color: orange),
              labelText: 'Group Name',
              labelStyle: TextStyle(fontSize: 15.0, color: orange),
              enabledBorder: UnderlineInputBorder(
                borderSide: BorderSide(color: orange),
              ),
              focusedBorder: UnderlineInputBorder(
                borderSide: BorderSide(color: orange),
              ),
              border: UnderlineInputBorder(
                borderSide: BorderSide(color: orange),
              ),
            ),
          ),
          Center(child: continueButton()),
        ],
      ),
    );
  }

  Widget continueButton() {
    return Container(
        height: 70.0,
        width: 70.0,
        child: FittedBox(
            child: FloatingActionButton.extended(
          onPressed: () {},
          backgroundColor: orange,
          label: Text("Continue"),
        )));
  }
}
