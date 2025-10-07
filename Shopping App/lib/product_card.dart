import 'package:flutter/material.dart';

class ProductCard extends StatelessWidget{
  final String title;
  final double price;
  final String image;
  final Color backgroundColor;

  const ProductCard({
    super.key,
    required this.title,
    required this.price,
    required this.image,
    required this.backgroundColor,
    });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(20),
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: backgroundColor,
        /* We cannot use the Color and Box Decoration together inside the Container.
           If we want to use them together, then use Color inside the BoxDecoration */
        borderRadius: BorderRadius.circular(20)
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleMedium,),
          SizedBox(height: 5),
          Text('\$$price', style: Theme.of(context).textTheme.bodySmall,),
          SizedBox(height: 5),
          Center(child: Image.asset(image, height: 175,))
        ],
      ),
    );
  }
}