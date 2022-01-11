import 'package:flutter/material.dart';

import 'package:Splitlux/constants.dart';

void displayDialog(context, title, text) => showDialog(
    context: context,
    builder: (context) =>
      AlertDialog(
        title: Text(title),
        content: Text(text)
      ),
  );

Widget returnBackButton(BuildContext context, String text, Function() onPressed) {
  return RichText(
    text: TextSpan(
      style: const TextStyle(
        color: orange,
        fontWeight: FontWeight.bold,
        fontSize: 30,
      ),
      children: [
        WidgetSpan(
          child: GestureDetector(
              onTap: onPressed,
              child: const Icon(
                Icons.arrow_back,
                color: orange,
                size: 30,
              )
            )
        ),
        TextSpan(text: ' $text'),
      ],
    ),
  );
}

Widget errorReturnView(BuildContext context, String title, String buttonText, Function() onPressed) {
  return Stack(children: [
    Center(
        child: Container(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
            margin: const EdgeInsets.fromLTRB(0, 0, 0, 100),
            child: Text(
              title,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Colors.white,
                letterSpacing: 1,
                fontSize: 23,
              ),
            ))),
    Center(
        child: Container(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
            child: FittedBox(
                child: FloatingActionButton.extended(
              heroTag: "returnBtn",
              onPressed: onPressed,
              backgroundColor: orange,
              label: Text(buttonText),
            )))),
  ]);
}