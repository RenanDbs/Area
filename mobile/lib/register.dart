import 'dart:convert';
import 'package:area/dashboard.dart';
import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:sign_button/sign_button.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:axios/axios.dart';
import 'package:http/http.dart' as http;
import './main.dart';

TextEditingController RegemailController = TextEditingController();
TextEditingController RegpasswordController = TextEditingController();

class RegisterRoute extends StatelessWidget {
  const RegisterRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: primaryColor,
          title: const Text('AREA'),
        ),
        body: ListView(children: <Widget>[
          Container(
            margin: const EdgeInsets.only(top: 50, left: 42),
            child: const Text(
              'Sign Up',
              style: TextStyle(
                  color: Color(0xFF094067),
                  fontFamily: 'Orbitron',
                  fontSize: 50,
                  fontWeight: FontWeight.w100),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(10),
            margin: const EdgeInsets.only(top: 150),
            child: TextFormField(
              controller: RegemailController,
              decoration: const InputDecoration(
                icon: Icon(Icons.man),
                labelText: 'Username / Email',
                labelStyle: TextStyle(
                  color: Color(0xFF094067),
                ),
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFF094067)),
                ),
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(10),
            child: TextFormField(
              controller: RegpasswordController,
              obscureText: true,
              decoration: const InputDecoration(
                icon: Icon(Icons.lock),
                labelText: 'Password',
                labelStyle: TextStyle(
                  color: Color(0xFF094067),
                ),
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFF094067)),
                ),
              ),
            ),
          ),
          Container(
              padding: const EdgeInsets.only(
                  left: 100, top: 20, right: 100, bottom: 0),
              height: 60,
              width: 60,
              child: ElevatedButton(
                  onPressed: () async {
                    var body = {
                      'email': (RegemailController.text),
                      'password': (RegpasswordController.text),
                    };
                    final response = await http.post(
                        Uri.parse('http://$myIP:8080/v2/auth/register'),
                        body: body);
                    print(response.body);
                    if (response.statusCode == 200) {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const Dashboard(
                                  title: 'AREA',
                                )),
                      );
                    } else {
                      showDialog(
                        context: context,
                        builder: (context) {
                          return const AlertDialog(
                            content: Text(
                              "User is already registered",
                              style: TextStyle(color: Colors.red),
                            ),
                          );
                        },
                      );
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFEF4565),
                  ),
                  child: const Text(
                    'Create an account',
                    style: TextStyle(
                        fontFamily: 'Orbitron',
                        fontSize: 15,
                        fontWeight: FontWeight.w100),
                  ))),
        ]));
  }
}
