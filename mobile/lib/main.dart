import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sign_button/sign_button.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import './register.dart';
import './dashboard.dart';
import './link.dart';
import './googleSign.dart';

const primaryColor = Color(0xFFD8EEFE);
var myIP = '192.168.2.105';
TextEditingController emailController = TextEditingController();
TextEditingController passwordController = TextEditingController();
TextEditingController ipController = TextEditingController();
Future main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) => ChangeNotifierProvider(
      create: (context) => GoogleSignInProvider(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Flutter Demo',
        theme: ThemeData(
          primaryColor: primaryColor,
          appBarTheme: const AppBarTheme(
            iconTheme: IconThemeData(color: Color(0xFF094067)),
            foregroundColor: Color(0xFF094067),
          ),
        ),
        home: const MyHomePage(title: 'AREA'),
      ));
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        title: Text(widget.title),
      ),
      body: ListView(children: <Widget>[
        Container(
          margin: const EdgeInsets.only(top: 50, left: 42),
          child: const Text(
            'Welcome\nBack',
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
            controller: emailController,
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
            controller: passwordController,
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
            padding:
                const EdgeInsets.only(left: 50, top: 50, right: 50, bottom: 10),
            height: 100,
            width: 100,
            child: ElevatedButton(
                onPressed: () async {
                  var body = {
                    'email': (emailController.text),
                    'password': (passwordController.text),
                  };
                  final response = await http.post(
                    Uri.parse('http://$myIP:8080/v2/auth/login'),
                    body: body,
                  );
                  print(response.body);
                  if (response.statusCode == 200) {
                    /*
                    Map<String, dynamic> value = json.decode(response.body);
                    SharedPrefrence().setToken(value['jwt']);*/
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
                            "Email or Password are wrong",
                            style: TextStyle(color: Colors.red),
                          ),
                        );
                      },
                    );
                  }
                },
                style: ButtonStyle(
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ))),
                child: const Text(
                  'Sign-in',
                  style: TextStyle(
                      fontFamily: 'Orbitron',
                      fontSize: 25,
                      fontWeight: FontWeight.w100),
                ))),
        Container(
            padding:
                const EdgeInsets.only(left: 80, top: 10, right: 80, bottom: 10),
            width: 60,
            height: 60,
            child: SignInButton(
              buttonType: ButtonType.google,
              onPressed: () {
                final provider =
                    Provider.of<GoogleSignInProvider>(context, listen: false);
                provider.googleLogin();
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const Dashboard(
                            title: 'AREA',
                          )),
                );
              },
            )),
        Container(
            padding: const EdgeInsets.only(
                left: 100, top: 10, right: 100, bottom: 10),
            height: 50,
            width: 50,
            child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const RegisterRoute()),
                  );
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
        Container(
          padding:
              const EdgeInsets.only(left: 110, top: 0, right: 110, bottom: 0),
          width: 40,
          height: 40,
          child: ElevatedButton(
            onPressed: () {
              showDialog(
                context: context,
                builder: (BuildContext context) => _buildPopupDialog(context),
              );
            },
            child: const Text(
              'Enter your IP',
              style: TextStyle(
                  fontFamily: 'Orbition',
                  fontSize: 15,
                  fontWeight: FontWeight.w100),
            ),
          ),
        ),
      ]),
    );
  }
}

class SharedPrefrence {
  Future<bool> setToken(String token) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString("token", token);
  }

  Future<String> getToken() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString("token").toString();
  }
}

Widget _buildPopupDialog(BuildContext context) {
  return AlertDialog(
    title: const Text('Enter your IP'),
    actions: <Widget>[
      TextFormField(
        controller: ipController,
        decoration: const InputDecoration(
          icon: Icon(Icons.input),
          labelText: 'IP',
          labelStyle: TextStyle(
            color: Color(0xFF094067),
          ),
          enabledBorder: UnderlineInputBorder(
            borderSide: BorderSide(color: Color(0xFF094067)),
          ),
        ),
      ),
      TextButton(
        onPressed: () {
          myIP = ipController.text;
          Navigator.of(context).pop();
        },
        child: const Text('OK'),
      ),
    ],
  );
}
