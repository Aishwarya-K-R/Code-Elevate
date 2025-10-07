import 'package:flutter/material.dart';
import 'package:shopping_app/cart_page.dart';
import 'package:shopping_app/product_list.dart';
// import 'package:shopping_app/global_variables.dart';

class HomePage extends StatefulWidget{
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int currentPage =0 ;

  List<Widget>pages = [
    ProductList(),
    CartPage()
  ];

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      body: IndexedStack( // this is added to maintain the scroll position on navigation
        index: currentPage,
        children: pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        selectedFontSize: 0, // to reduce the size of navigation bar, as label occupies space even when its empty
        unselectedFontSize: 0,
        iconSize: 35,
        onTap: (value) {
          setState(() {
            currentPage = value;
          });
        },
        currentIndex: currentPage,
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_cart), label: '')
        ],
      ),
    );
  }
}