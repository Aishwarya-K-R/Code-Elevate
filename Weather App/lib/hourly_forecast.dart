import 'package:flutter/material.dart';

class HourlyForecast extends StatelessWidget{
  final String time;
  final IconData icon;
  final String temp;
  const HourlyForecast({super.key,
    required this.time,
    required this.icon,
    required this.temp,
    });

  @override
  Widget build(BuildContext context){
    return Card(
      elevation: 6,
      child: Container(
        width: 214,
        padding: const EdgeInsets.all(8.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Text(
                time,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
              ),
              maxLines: 1, //restricting the text to 1 line
              overflow: TextOverflow.ellipsis, //to inform that there's still more to display(when clipped) like etc
            ),
            const SizedBox(height: 8,),
            Icon(icon, size: 32,),
            const SizedBox(height: 8,),
            Text(
              temp,
            ),
          ],
        ),
      ),
    );
  }
}