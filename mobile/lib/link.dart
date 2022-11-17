import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:sign_button/sign_button.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:axios/axios.dart';
import 'package:googleapis/youtube/v3.dart';
import 'package:url_launcher/url_launcher_string.dart';
import './register.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:http/http.dart' as http;
import 'package:cupertino_icons/cupertino_icons.dart';
import './main.dart';

class Link extends StatelessWidget {
  const Link({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: primaryColor,
          title: const Text('Link your services'),
        ),
        body: ListView(children: <Widget>[
          Container(
            padding:
                const EdgeInsets.only(left: 50, top: 50, right: 50, bottom: 0),
            width: 250,
            height: 100,
            child: const ServiceButton(
              name: 'google_calendar',
              path: 'lib/icons/icons8-google-calendar-48.png',
            ),
          ),
          Container(
            padding:
                const EdgeInsets.only(left: 50, top: 50, right: 50, bottom: 0),
            width: 250,
            height: 100,
            child: const ServiceButton(
              name: 'google_sheets',
              path: 'lib/icons/icons8-google-sheets-48.png',
            ),
          ),
          Container(
            padding:
                const EdgeInsets.only(left: 50, top: 50, right: 50, bottom: 0),
            width: 250,
            height: 100,
            child: const ServiceButton(
              name: 'google_drive',
              path: 'lib/icons/icons8-google-drive-48.png',
            ),
          ),
          Container(
            padding:
                const EdgeInsets.only(left: 50, top: 50, right: 50, bottom: 0),
            width: 250,
            height: 100,
            child: const ServiceButton(
              name: 'gmail',
              path: 'lib/icons/icons8-gmail-48.png',
            ),
          ),
          Container(
            padding:
                const EdgeInsets.only(left: 50, top: 50, right: 50, bottom: 0),
            width: 250,
            height: 100,
            child: const ServiceButton(
              name: 'github',
              path: 'lib/icons/icons8-github-48.png',
            ),
          ),
        ]));
  }
}

class ServiceButton extends StatelessWidget {
  final String name;
  final String path;
  const ServiceButton(
      {super.key, required String this.name, required String this.path});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
        label: Text('Sign in with ' + name),
        icon: Image.asset(path),
        style: ButtonStyle(
          foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
          backgroundColor: MaterialStateProperty.all<Color>(Colors.white),
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(18.0),
              side: const BorderSide(color: Color(0xFF094067)),
            ),
          ),
        ),
        onPressed: () async {
          final response = await http.post(
            Uri.parse('http://$myIP:8080/v2/authorize/$name'),
            headers: {
              'Cookie': 'jwt=' + await SharedPrefrence().getToken(),
            },
          );
          var data = json.decode(response.body);
          print(data['authorizationURL']);
          launchUrlString(data['authorizationURL']);
        });
  }
}
