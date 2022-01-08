class GroupsList {
  final List<Group> groups;

  GroupsList({
    required this.groups,
});

  factory GroupsList.fromJson(List<dynamic> parsedJson) {

    List<Group> groups = <Group>[];
    groups = parsedJson.map((i)=>Group.fromJson(i)).toList();

    return new GroupsList(
      groups: groups
    );
  }
}

class Group{
  final String id;
  final String name;
  final String code;

  Group({
    required this.id,
    required this.name,
    required this.code
}) ;

  factory Group.fromJson(Map<String, dynamic> json){
    return new Group(
      id: json['id'].toString(),
      name: json['name'],
      code: json['code_id'],
    );
  }
}