import 'dart:ffi';

class GroupDetails {
  final String id;
  final String name;
  final bool isClosed;
  final List<Member> members;
  final List<Transaction> transactions;

  GroupDetails({
    required this.id, 
    required this.name, 
    required this.members,
    required this.transactions, 
    required this.isClosed});

  factory GroupDetails.fromJson(Map<String, dynamic> parsedJson){

    var memberList = parsedJson['members'] as List;
    var transactionList = parsedJson['transactions'] as List;
    var isClosed = parsedJson['is_closed'] as bool;
    List<Member> membersList = memberList.map((i) => Member.fromJson(i)).toList();
    List<Transaction> transactionsList = transactionList.map((i) => Transaction.fromJson(i)).toList();

    return GroupDetails(
      id: parsedJson['id'].toString(),
      name: parsedJson['name'],
      isClosed: parsedJson['is_closed'],
      members: membersList,
      transactions: transactionsList
    );
  }
}

class Member {
  final String id;
  final String name;

  Member({
    required this.id, 
    required this.name});

  factory Member.fromJson(Map<String, dynamic> parsedJson){
   return Member(
     id:parsedJson['id'].toString(),
     name:parsedJson['name']
   );
  }
}

class Transaction {
  final String id;
  final String title;
  final String amount;

  Transaction({
    required this.id, 
    required this.title,
    required this.amount});

  factory Transaction.fromJson(Map<String, dynamic> parsedJson){
   return Transaction(
     id: parsedJson['id'].toString(),
     title: parsedJson['title'],
     amount: parsedJson["amount"].toString()
   );
  }
}