import 'dart:convert';
import 'dart:developer';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:googleapis/drive/v3.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sign_button/sign_button.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:axios/axios.dart';
import './register.dart';
import './map.dart';
import './link.dart';
import './main.dart';
import 'package:http/http.dart' as http;

var nbItems = 1;

String FValS1 = 'gmail';
String FValS2 = 'google_sheets';
String FValA = 'search_email';
String FValR = 'update_spreadsheet';

var Services1 = [
  'gmail',
  'google_calendar',
  'google_sheets',
  'oogle_drive',
  'github',
];
var Services2 = [
  'gmail',
  'google_calendar',
  'google_sheets',
  'oogle_drive',
  'github',
];
var Actions = [
  'new_video',
  'sub_goal',
  'receive_email',
  'push',
  'new_event_created',
  'issue_created',
  'new_pull_request',
];
var Reactions = [
  'update_spreadsheet',
  'upload_video',
  'set_thumbnail',
  'send_email',
  'create_event',
];

final user = FirebaseAuth.instance.currentUser!;
var name = user.displayName;

class Dashboard extends StatefulWidget {
  const Dashboard({super.key, required this.title});
  final String title;

  @override
  State<Dashboard> createState() => _Dashboard();
}

class _Dashboard extends State<Dashboard> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: const Color(0xff6750a4),
        useMaterial3: true,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome $name'),
          backgroundColor: primaryColor,
        ),
        body: ListView.builder(
            itemCount: nbItems,
            itemBuilder: (BuildContext context, int index) {
              return const ElevatedCardExample();
            }),
        floatingActionButton: FloatingActionButton(
          backgroundColor: const Color.fromARGB(255, 255, 255, 255),
          child: const Dial(
            title: 'DIAL',
          ),
          onPressed: () {},
        ),
      ),
    );
  }
}

class Dial extends StatefulWidget {
  const Dial({super.key, required this.title});
  final String title;

  @override
  State<Dial> createState() => _Dial();
}

class _Dial extends State<Dial> {
  String ValS1 = 'gmail';
  String ValS2 = 'google_calendar';
  String ValA = 'receive_email';
  String ValR = 'send_email';

  @override
  Widget build(BuildContext context) {
    return Align(
        child: SpeedDial(
            animatedIcon: AnimatedIcons.menu_close,
            backgroundColor: const Color(0xFFD8EEFE),
            foregroundColor: const Color(0xFF094067),
            spacing: 12,
            children: [
          SpeedDialChild(
              child: const Icon(Icons.add),
              backgroundColor: const Color(0xFFD8EEFE),
              foregroundColor: const Color(0xFF094067),
              label: 'Add',
              onTap: () {
                showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                          title: const Text('Choose Service'),
                          actions: [
                            DropdownButton(
                              alignment: Alignment.bottomLeft,
                              value: ValS1,
                              items: Services1.map((String items) {
                                return DropdownMenuItem(
                                  value: items,
                                  child: Text(items),
                                );
                              }).toList(),
                              onChanged: (String? newValue) {
                                setState(() {
                                  ValS1 = newValue!;
                                });
                              },
                            ),
                            DropdownButton(
                              value: ValS2,
                              items: Services2.map((String items) {
                                return DropdownMenuItem(
                                  value: items,
                                  child: Text(items),
                                );
                              }).toList(),
                              onChanged: (String? newValue) {
                                setState(() {
                                  ValS2 = newValue!;
                                });
                              },
                            ),
                            DropdownButton(
                              value: ValA,
                              items: Actions.map((String items) {
                                return DropdownMenuItem(
                                  value: items,
                                  child: Text(items),
                                );
                              }).toList(),
                              onChanged: (String? newValue) {
                                setState(() {
                                  ValA = newValue!;
                                });
                              },
                            ),
                            DropdownButton(
                              value: ValR,
                              items: Reactions.map((String items) {
                                return DropdownMenuItem(
                                  value: items,
                                  child: Text(items),
                                );
                              }).toList(),
                              onChanged: (String? newValue) {
                                setState(() {
                                  ValR = newValue!;
                                });
                              },
                            ),
                            TextButton(
                              child: Text("Continue"),
                              onPressed: () async {
                                setState(() {
                                  nbItems = nbItems + 1;
                                });
                                FValS1 = ValS1;
                                FValS2 = ValS2;
                                FValA = ValA;
                                FValR = ValR;

                                var body = {
                                  'action': {
                                    '_id': idAction(FValA),
                                    'parameters': paramAction(FValA),
                                  },
                                  'reaction': {
                                    '_id': idReaction(FValR),
                                    'parameters': paramReaction(FValR),
                                  },
                                };
                                print(body);
                                http.post(
                                  Uri.parse('http://$myIP:8080/v2/area'),
                                  body: body,
                                  headers: {
                                    'Cookie': 'jwt=' +
                                        await SharedPrefrence().getToken(),
                                  },
                                );

                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => const Dashboard(
                                            title: 'AREA',
                                          )),
                                );
                              },
                            ),
                          ],
                        ));
              }),
          SpeedDialChild(
              child: const Icon(Icons.delete),
              backgroundColor: const Color(0xFFD8EEFE),
              foregroundColor: const Color(0xFF094067),
              label: 'Delete',
              onTap: () async {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const Dashboard(
                            title: 'AREA',
                          )),
                );
              }),
          SpeedDialChild(
              child: const Icon(Icons.link),
              backgroundColor: const Color(0xFFD8EEFE),
              foregroundColor: const Color(0xFF094067),
              label: 'Link a service',
              onTap: () async {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const Link()),
                );
              })
        ]));
  }
}

class ElevatedCardExample extends StatelessWidget {
  const ElevatedCardExample({super.key});
  @override
  Widget build(BuildContext context) {
    return Card(
      child: SizedBox(
        width: 300,
        height: 100,
        child: Center(
            child: Text(
                'Service : $FValS1,\t Action : $FValA,\nService : $FValS2,\tReaction : $FValR')),
      ),
    );
  }
}

Future<String> getData() async {
  var header = {
    'content-Type': 'application/json',
    'Accept': '/',
    'Cache-Control': 'no-cache',
    'cookie': ('jwt=' + await SharedPrefrence().getToken()),
  };
  final response = await http.get(
    Uri.parse('http://$myIP:8080/v2/area'),
    headers: header,
  );
  return (response.body);
}
