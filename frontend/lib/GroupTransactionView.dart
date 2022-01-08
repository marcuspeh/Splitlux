import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:frontend/GroupView.dart';
import 'package:frontend/constants.dart';

class GroupTransactionView extends StatefulWidget {
  @override
  _GroupTransactionViewState createState() => _GroupTransactionViewState();
}

class _GroupTransactionViewState extends State<GroupTransactionView> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _totalAmountController;
  static List<String?> payerList = [null];
  static List<double?> payerAmount = [null];
  static List<String?> payeeList = [null];

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController();
    _totalAmountController = TextEditingController();
  }

  @override
  void dispose() {
    _nameController.dispose();
        _totalAmountController.dispose();
    super.dispose();
  }

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
            child: transactionAndBack(),
          ),
          Container(
            child: formContents(),
            margin: EdgeInsets.fromLTRB(20, 100, 0, 0),
          )
        ],
      ),
    );
  }

  Widget transactionAndBack() {
    return RichText(
      text: TextSpan(
        style: TextStyle(
          color: orange,
          fontWeight: FontWeight.bold,
          fontSize: 30,
        ),
        children: [
          // WidgetSpan(
          //     child: Container(
          //   child: GestureDetector(
          //       onTap: () => Navigator.of(context).push(
          //             MaterialPageRoute(
          //               builder: (_) => GroupView(),
          //             ),
          //           ),
          //       child: Icon(Icons.arrow_back)),
          // )),
          TextSpan(text: 'Transactions'),
        ],
      ),
    );
  }

  Widget formContents() {
    return ListView(children: [
      Form(
        key: _formKey,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // name textfield
              Padding(
                padding: const EdgeInsets.only(right: 32.0),
                child: TextFormField(
                  style: TextStyle(color: Colors.white),
                  controller: _nameController,
                  decoration: InputDecoration(
                      enabledBorder: UnderlineInputBorder(
                        borderSide: BorderSide(color: Colors.white),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(color: Colors.white)),
                      hintText: 'Enter transaction description',
                      hintStyle: TextStyle(color: Colors.white24)),
                  validator: (v) {
                    if (v!.trim().isEmpty) return 'Please enter something';
                    return null;
                  },
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Padding(
                padding: const EdgeInsets.only(right: 32.0),
                child: TextFormField(
                  style: TextStyle(color: Colors.white),
                  controller: _totalAmountController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                      enabledBorder: UnderlineInputBorder(
                        borderSide: BorderSide(color: Colors.white),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(color: Colors.white)),
                      hintText: 'Enter amount',
                      hintStyle: TextStyle(color: Colors.white24)),
                  validator: (v) {
                    if (v!.trim().isEmpty) return 'Please enter something';
                    return null;
                  },
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Text(
                'Add Payers',
                style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 16,
                    color: Colors.white),
              ),
              ..._getPayers(),
              Text(
                'Add Payees',
                style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 16,
                    color: Colors.white),
              ),
              ..._getPayees(),
              SizedBox(
                height: 40,
              ),
              FlatButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState!.save();
                  }
                },
                child: Text('Submit'),
                color: Colors.green,
              ),
            ],
          ),
        ),
      ),
    ]);
  }

  /// get firends text-fields
  List<Widget> _getPayers() {
    List<Widget> payerTextFields = [];
    for (int i = 0; i < payerList.length; i++) {
      payerTextFields.add(Padding(
        padding: const EdgeInsets.symmetric(vertical: 16.0),
        child: Row(
          children: [
            Expanded(child: PayerTextFields(i)),
            SizedBox(
              width: 16,
            ),
            Expanded(child: PayerTextFieldsAmount(i)
              ),
            // we need add button at last payer row
            _addRemovePayerButton(i == payerList.length - 1, i),
          ],
        ),
      ));
    }
    return payerTextFields;
  }

  List<Widget> _getPayees() {
    List<Widget> payeeTextFields = [];
    for (int i = 0; i < payeeList.length; i++) {
      payeeTextFields.add(Padding(
        padding: const EdgeInsets.symmetric(vertical: 16.0),
        child: Row(
          children: [
            Expanded(child: PayeeTextFields(i)),
            SizedBox(
              width: 16,
            ),
            // we need add button at last payer row
            _addRemovePayeeButton(i == payeeList.length - 1, i),
          ],
        ),
      ));
    }
    return payeeTextFields;
  }

  /// add / remove button
  Widget _addRemovePayerButton(bool add, int index) {
    return InkWell(
      onTap: () {
        if (add) {
          // add new text-fields at the top of all payer textfields
          payerList.insert(0, null);
        } else
          payerList.removeAt(index);
        setState(() {});
      },
      child: Container(
        width: 30,
        height: 30,
        decoration: BoxDecoration(
          color: (add) ? Colors.green : Colors.red,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Icon(
          (add) ? Icons.add : Icons.remove,
          color: Colors.white,
        ),
      ),
    );
  }

  Widget _addRemovePayeeButton(bool add, int index) {
    return InkWell(
      onTap: () {
        if (add) {
          // add new text-fields at the top of all payer textfields
          payeeList.insert(0, null);
        } else
          payeeList.removeAt(index);
        setState(() {});
      },
      child: Container(
        width: 30,
        height: 30,
        decoration: BoxDecoration(
          color: (add) ? Colors.green : Colors.red,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Icon(
          (add) ? Icons.add : Icons.remove,
          color: Colors.white,
        ),
      ),
    );
  }
}

class PayerTextFields extends StatefulWidget {
  final int index;
  PayerTextFields(this.index);
  @override
  _PayerTextFieldsState createState() => _PayerTextFieldsState();
}

class _PayerTextFieldsState extends State<PayerTextFields> {
  late TextEditingController _nameController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController();
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance?.addPostFrameCallback((timeStamp) {
      _nameController.text =
          _GroupTransactionViewState.payerList[widget.index] ?? '';
    });

    return TextFormField(
      style: TextStyle(color: Colors.white),
      maxLength: 20,
      controller: _nameController,
      onChanged: (v) => _GroupTransactionViewState.payerList[widget.index] = v,
      decoration: InputDecoration(
        counterText: "",
          enabledBorder: UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.white),
          ),
          focusedBorder:
              UnderlineInputBorder(borderSide: BorderSide(color: Colors.white)),
          hintText: 'Enter payer\'s name',
          hintStyle: TextStyle(color: Colors.white24)),
      validator: (v) {
        if (v!.trim().isEmpty) return 'Please enter something';
        return null;
      },
    );
  }
}

class PayerTextFieldsAmount extends StatefulWidget {
  final int index;
  PayerTextFieldsAmount(this.index);
  @override
  _PayerTextFieldsAmountState createState() => _PayerTextFieldsAmountState();
}

class _PayerTextFieldsAmountState extends State<PayerTextFieldsAmount> {
  late TextEditingController _payerAmountController;

  @override
  void initState() {
    super.initState();
    _payerAmountController = TextEditingController();
  }

  @override
  void dispose() {
    _payerAmountController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance?.addPostFrameCallback((timeStamp) {
      _payerAmountController.text =
          (_GroupTransactionViewState.payerAmount[widget.index] ?? 0.0).toString();
    });

    return TextFormField(
                  style: TextStyle(color: Colors.white),
                  controller: _payerAmountController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                      enabledBorder: UnderlineInputBorder(
                        borderSide: BorderSide(color: Colors.white),
                      ),
                      focusedBorder: UnderlineInputBorder(
                          borderSide: BorderSide(color: Colors.white)),
                      hintText: 'Enter amount',
                      hintStyle: TextStyle(color: Colors.white24)),
                  validator: (v) {
                    if (v!.trim().isEmpty) return 'Please enter something';
                    return null;
                  },
                );
  }
}

class PayeeTextFields extends StatefulWidget {
  final int index;
  PayeeTextFields(this.index);
  @override
  _PayeeTextFieldsState createState() => _PayeeTextFieldsState();
}

class _PayeeTextFieldsState extends State<PayeeTextFields> {
  late TextEditingController _nameController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController();
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance?.addPostFrameCallback((timeStamp) {
      _nameController.text =
          _GroupTransactionViewState.payeeList[widget.index] ?? '';
    });

    return TextFormField(
      style: TextStyle(color: Colors.white),
      controller: _nameController,
      onChanged: (v) => _GroupTransactionViewState.payeeList[widget.index] = v,
      decoration: InputDecoration(
          enabledBorder: UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.white),
          ),
          focusedBorder:
              UnderlineInputBorder(borderSide: BorderSide(color: Colors.white)),
          hintText: 'Enter payee\'s name',
          hintStyle: TextStyle(color: Colors.white24)),
      validator: (v) {
        if (v!.trim().isEmpty) return 'Please enter something';
        return null;
      },
    );
  }
}
