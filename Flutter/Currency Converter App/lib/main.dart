// This is the first file to be exceuted
import 'package:currency_converter/currency_converter_material_page.dart';
import 'package:flutter/material.dart';//automatic import by flutter
/*import './currency_converter_material_page.dart';*/ //relative import

void main(){
  //runApp is used to run the app.
  //here, app is a widget(abstract class), which r the building blocks of ui and they r responsible for describing how
  //the ui should look like. Eg: buttons, headers, nav bar
  runApp(const MyApp());//compile-time constant-indicates that the widget class is not required 
  //to be recreated every time

}

//Types of widgets : (1 and 2 are for UI related stuff)
//1.Stateful widget
//2.Stateless widget(immutable):once the widget is created, it cannot be changed
//3.Inherited widget(mutable)

//State refers to any data that determines how the ui should look like,be rendered or behave like
class MyApp extends StatelessWidget{

  const MyApp ({super.key}); //since Widget class(super class of StatelessWidget) has a constructor defined with key,
  //we need to define the key here as well, as an abstract super class takes that key from its subclass
  //{super.key}:key is optional(nullable)

  //Key:a class that helps flutter to identify and distinguish b/w the widgets


  //Design Systems :
  //1.Material Design:developed by Google(Android)
  //2.Cupertino Design:developed by Apple(IOS)
  @override //since, widget is an abstract class

  /* BuildContext:helps flutter to determine the position of a widget(that extends Stateleass widget) in the widget tree*/

  Widget build(BuildContext context){
    //return const Text("Hello World!!!", textDirection: TextDirection.ltr); //ltr - left to right

    /*MaterialApp provides the capabilities of navigating across multiple pages(global space)-only 1 per app
      Scaffold provides the features for a page(sets up local space within MaterialApp)-can be many*/

    return const MaterialApp(
      // home : Text("Hello World"), //requires an optional widget;but doesnt provide proper look.
      ////thats why we use Scaffold
      home : CurrencyConverterMaterialPage(),
    );//to implement material design in our app

    /* Widget Tree */

  }
}