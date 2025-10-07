import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shopping_app/cart_provider.dart';

class ProductDetailsPage extends StatefulWidget {
  final Map<String,Object> product;
  const ProductDetailsPage({
    super.key,
    required this.product,
    });

  @override
  State<ProductDetailsPage> createState() => _ProductDetailsPageState();
}

class _ProductDetailsPageState extends State<ProductDetailsPage> {
  int selectedSize = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Details'),
      ),
      body: Column(
        children: [
          Text(widget.product['title'] as String, style: Theme.of(context).textTheme.titleLarge,),
          Spacer(), //for relative spacing (to provide the spacing that looks consistent across different devices)
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Image.asset(widget.product['imageUrl'] as String),
          ),
          Spacer(flex: 2,),
          Container(
            height: 250,
            decoration: BoxDecoration(
              color: Color.fromRGBO(245, 247, 249, 1),
              borderRadius: BorderRadius.circular(40)
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('\$${widget.product['price']}',
                style: Theme.of(context).textTheme.titleLarge,
                ),
                SizedBox(height: 10,),

                /* ListView is used when no. of items is known and fixed
                whereas, ListView.builder is when for varying items' count */
                SizedBox(
                  height: 50,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: (widget.product['sizes'] as List<int>).length,
                    itemBuilder: (context, index){
                      final size = (widget.product['sizes'] as List<int>)[index];
                      return Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: GestureDetector(
                          onTap: () {
                            setState(() {
                              selectedSize = size;
                            });
                          },
                          child: Chip(
                            label: Text(size.toString()),
                            backgroundColor: selectedSize == size ? Theme.of(context).colorScheme.primary : null,
                          ),
                        ),
                      );
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: ElevatedButton(
                    onPressed: (){
                      if(selectedSize!=0){
                        Provider.of<CartProvider>(context, listen: false).addProduct({
                        'id' : widget.product['id'],
                        'title' : widget.product['title'],
                        'price' : widget.product['price'],
                        'company' : widget.product['company'],
                        'sizes' : selectedSize,
                        'imageUrl' : widget.product['imageUrl'],
                      });
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Product added successfully')
                        )
                      );
                    }
                    else{
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Please select a size!')
                        )
                      );
                    }
                      
                      // whenever we use Provider.of<CartProvider> outside the build function, listen should be set to false
                    }, 
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Theme.of(context).colorScheme.primary,
                      minimumSize: Size(double.infinity, 50)
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.shopping_cart, color: Colors.black),
                        SizedBox(width: 10),
                        Text(
                          'Add To Cart',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                          ),
                        ),
                      ],
                    ),
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}