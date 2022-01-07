import 'package:flutter/material.dart';

const Color purple = Color.fromRGBO(72, 66, 109, 1);
const Color orange = Color.fromRGBO(238, 194, 141, 1);
const Color darkPurple = Color.fromRGBO(55, 50, 88, 1);

var exampleData = ['Munich', 'Prague', 'London'];

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: purple,
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
            top: 155,
            left: 21,
            child: billedContainer(size),
          ),
        ],
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
                  builder: (_) => HomePage(),
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
