import 'package:flutter/material.dart';
import 'package:frontend/constants.dart';

class JoinTravelGroup extends StatefulWidget {
  @override
  _JoinTravelGroupState createState() => _JoinTravelGroupState();
}

class _JoinTravelGroupState extends State<JoinTravelGroup> {
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
                        builder: (_) => JoinTravelGroup(),
                      ),
                    ),
                child: Icon(Icons.arrow_back)),
          )),
          TextSpan(text: 'Join a Travel Group'),
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
              hintText: 'Enter group code',
              hintStyle: TextStyle(fontSize: 15.0, color: orange),
              labelText: 'Group Code',
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
