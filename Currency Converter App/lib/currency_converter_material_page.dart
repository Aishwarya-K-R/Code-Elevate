import 'package:flutter/material.dart';

//Widgets are immutable.
//State makes the widget mutable.

class CurrencyConverterMaterialPage extends StatefulWidget{
  const CurrencyConverterMaterialPage({super.key});

  @override
  //to create state
  State<CurrencyConverterMaterialPage> createState() => _CurrencyConverterMaterialPage();
}

class _CurrencyConverterMaterialPage extends State<CurrencyConverterMaterialPage>{

  //initState function(given by State) is used whenever we want to perform any function even before build function is called
  // @override 
  // void initState(){
  //   super.initState();
  // }

  //this function is called whenever we dont't want some widget to exist in the Widget Tree (at the end)
  //Its opposite to initState(), and used to clear the memory, to avoid memory leaks.
  @override
  void dispose(){
    textEditingController.dispose();
    super.dispose();
  }

  double result=0;
  //required to accept the user input from text field
  TextEditingController textEditingController=TextEditingController(); 

  void convert(){
    result=double.parse(textEditingController.text)*81;

    //used when internal state of an object is changed and that needs to be reflected in the UI
    //calls build function and necessary widgets are rebuilt
    setState(() {});
  }

  @override
  Widget build(BuildContext context){
    
    final border = OutlineInputBorder( //by default, color : 0XAARRGGBB
                  borderSide: const BorderSide(
                    width: 2.0,
                    style: BorderStyle.solid,
                  ),
                  // borderRadius: BorderRadius.all(
                  //   Radius.circular(60)
                  borderRadius: BorderRadius.circular(5),
                  );

    return Scaffold(
        // body : Center(
        //   child : Text("Hello World"),
        // ),
        backgroundColor: Colors.blueGrey,
        appBar: AppBar(
          backgroundColor: Colors.blueGrey,
          elevation: 0,
          title: const Text('Currency Converter'),
          centerTitle: true,
          foregroundColor: Colors.white,
        ),
        body : Center(
          child : Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(//related to Layout, not rendering - for vertical alignment(multiple widgets)
            mainAxisAlignment: MainAxisAlignment.center, //vertical
            crossAxisAlignment: CrossAxisAlignment.center, //horizontal-but this doesn't work without center
            children : [
              Text('INR ${result!=0 ? result.toStringAsFixed(3) : result.toStringAsFixed(0)}',
                style: TextStyle(
                  fontSize: 45,
                  fontWeight: FontWeight.bold,
                  color: Color.fromARGB(255, 255, 255, 255)
                ),
              ),
              //We can either use padding or container to set the padding
              //Container contains padding and many other widgets inside it
              TextField(
                controller: textEditingController,
                style: TextStyle(
                  color: Colors.black
                ),
                decoration: InputDecoration(
                  hintText: 'Please enter the amount in USD',
                  hintStyle: TextStyle( //hintStyle-acts as a placeholder
                    color: Colors.black,
                  ),
                  prefixIcon: Icon(Icons.monetization_on_outlined), //this doesn't disappear on typing
                  prefixIconColor: Colors.black,
                  filled: true,
                  fillColor: Colors.white,
                  focusedBorder: border,
                  enabledBorder: border,
                ),
                keyboardType: const TextInputType.numberWithOptions(
                  decimal: true,
                ),
              ), //TextField is used to display Text Box
            
              //2 types of button : raised, appears like text
              /*Lint : imposes good coding practices. We can modify the things as per our requirement
              under the linter:rules section in analysis_options.yaml */
            
              //3 modes : debug, release and profile
              //1.debug mode(default):testing our application
              //2.release mode:making our app to run on production
              //3.profile:comb. of debug and release. Runs the app in release mode but displays warnings and error messages
              
              const SizedBox(height:10), //this can also be replaced by Container
              //but SizeBox is preferred because Container doesn't have const and hence gets rebuilt every time
              TextButton(onPressed: (){ //onPressed : convert,
                //TextButton-text(flat-earlier), ElevatedButton-raised(raised earlier)
                // print(textEditingController.text);
                // print(double.parse(textEditingController.text)*81);
                convert();
              }, 
              /* style : ButtonStyle(
                backgroundColor: const WidgetStatePropertyAll(Colors.black),
                foregroundColor: const WidgetStatePropertyAll(Colors.white),
                minimumSize: const WidgetStatePropertyAll(
                  Size(double.infinity, 50),
                ),
                shape: WidgetStatePropertyAll(
                  RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5),
                  ),
                ),
              ), */
              
              //alternative to using WidgetPropertyAll
              style : TextButton.styleFrom(
                backgroundColor: Colors.black,
                foregroundColor: Colors.white,
                minimumSize: Size(double.infinity, 50),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5),
                  ),
                ),
              child: const Text('Convert'),
              ),
            ],
                    ),
          ),
      ), 
    );
    //Here, all the widgets inside the Scaffold should be const, as we have specified const before Scaffold,
    //otherwise we get errors
    /*Note : if a child widget isn't const, we cannot specify const in any of its parent widgets */
  }
}


