import 'package:flutter/material.dart';
import 'package:shopping_app/global_variables.dart';
import 'package:shopping_app/product_card.dart';
import 'package:shopping_app/product_details_page.dart';

class ProductList extends StatefulWidget {
  const ProductList({super.key});

  @override
  State<ProductList> createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  final List<String> filters = const ['All', 'Adidas', 'Nike', 'Bata'];
  late String selectedFilter=filters[0];

   @override
  void initState(){
    super.initState();
    selectedFilter=filters[0];
  }

  @override
  Widget build(BuildContext context) {
    final border = OutlineInputBorder(
                        borderSide: BorderSide(
                          color: Color.fromRGBO(225, 225, 225, 1)
                        ),
                        borderRadius: BorderRadius.horizontal(left : Radius.circular(50),
                        ),
                      );

    return SafeArea( //this ensures that the text is displayed below the top notch of the mobile emulator(avoids the bottom notch as well)
        child: Column(
          children: [
            Row(
              children: [
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Text('Shoes\nCollection',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                ),
                Expanded( //this ensures that a widget occupies only available space in a row or column
                // to ensure the uniformity across all the devices
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Search',
                      prefixIcon: Icon(Icons.search),
                      border: border,
                      enabledBorder: border,
                      focusedBorder: border,
                    ),
                  )
                ),
              ],
            ),
            SizedBox(
              height: 120,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: filters.length,
                itemBuilder: (context, index){
                  final filter = filters[index];
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0),
                    child: GestureDetector(
                      onTap: () {
                        setState(() {
                          selectedFilter=filter;
                        });
                      },
                      child: Chip(
                        backgroundColor: selectedFilter == filter ? //to get the color from the colorScheme of main.dart
                          Theme.of(context).colorScheme.primary : const Color.fromRGBO(245, 247, 249, 1),
                        /* Theme.of(context) - triggers the Inherited Widget. */
                        side: BorderSide(
                          color: const Color.fromRGBO(245, 247, 249, 1),
                        ),
                        label: Text(filter),
                        labelStyle: TextStyle(
                          fontSize: 16,
                        ),
                        padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadiusGeometry.circular(30),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: products.length,
                itemBuilder: (context, index){
                  final product = products[index];
                  return GestureDetector(
                    onTap: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context){
                            return ProductDetailsPage(product: product);
                          },
                        ),
                      );
                    },
                    child: ProductCard(
                      title: product['title'] as String, 
                      price: product['price'] as double, 
                      image: product['imageUrl'] as String,
                      backgroundColor: index.isEven ? Color.fromRGBO(216, 240, 253, 1) : Color.fromRGBO(245, 247, 249, 1)
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      );
  }
}