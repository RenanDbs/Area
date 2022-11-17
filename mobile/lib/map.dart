import 'dart:convert';
import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
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
import './link.dart';
import './main.dart';
import 'package:http/http.dart' as http;

String idAction(String name) {
  if (name == 'receive_email') {
    return '63716a57feedeee6369fb6d1';
  }
  if (name == 'send_email') {
    return '637159f6feedeee6369fb6d0';
  }
  if (name == 'receive_email') {
    return '63716a57feedeee6369fb6d1';
  }
  if (name == 'push') {
    return '63704a2a3956c97ba48c1ac3';
  }
  if (name == 'new_event_created') {
    return 'fe';
  }
  if (name == 'issue_created') {
    return '637071553956c97ba48c1ad0';
  }
  if (name == 'new_pull_request') {
    return '63708cda3956c97ba48c1ad9';
  }
  return '0';
}

String idReaction(String name) {
  if (name == 'update_spreadsheet') {
    return 'fe';
  }
  if (name == 'upload_video') {
    return 'fe';
  }
  if (name == 'set_thumbnail') {
    return 'fe';
  }
  if (name == 'send_email') {
    return '637159f6feedeee6369fb6d0';
  }
  if (name == 'create_event') {
    return '637119cbfeedeee6369fb6c6';
  }

  return '0';
}

dynamic paramAction(String name) {
  if (name == 'push') {
    return {'owner': 'yo', 'repo': 'test'};
  }
  if (name == 'issue_created') {
    return {'owner': 'yo', 'repo': 'test'};
  }
  if (name == 'new_pull_request') {
    return {'owner': 'yo', 'repo': 'test'};
  }
  if (name == 'send_email') {
    return {'targetEmail': 'yo'};
  }
  if (name == 'receive_email') {
    return '';
  }

  return ('0');
}

dynamic paramReaction(String name) {
  if (name == 'update_spreadsheet') {
    return {'owner': 'yo', 'repo': 'test'};
  }
  if (name == 'upload_video') {
    return {'owner': 'yo', 'repo': 'test'};
  }
  if (name == 'set_thumbnail') {
    return {'owner': 'yo', 'repo': 'test'};
  }
  if (name == 'create_event') {
    return {'end': 'tommorow', 'start': 'today', 'title': 'Test'};
  }
  if (name == 'send_email') {
    return {
      'to': 'duboisrenan@gmail.com',
      'from': 'test@test.test',
      'subject': 'TEST',
      'message': 'HELLO'
    };
  }
  return ('0');
}
