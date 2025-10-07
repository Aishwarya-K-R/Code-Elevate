import 'dart:convert';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:weather_app/additional_information.dart';
import 'package:weather_app/hourly_forecast.dart';
import 'package:http/http.dart' as http;
import 'package:weather_app/secret_key.dart';

class WeatherApp extends StatefulWidget {
  const WeatherApp({super.key});

  @override
  State<WeatherApp> createState() => _WeatherAppState();
}

class _WeatherAppState extends State<WeatherApp> {
  late Future<Map<String,dynamic>> weather; //this is recommended
  //because when we refresh, entire scaffold gets refreshed and entire FutureBuilder gets rebuilt
  //that's why, we r storing the getWeather() in weather and using weather wherever required

  //async has to be compulsarily used with Future, as its asynchronous computation
  //Its always recommended to make return type as generic
  Future<Map<String,dynamic>> getCurrentWeather() async{ 
    try{
      String city='London';
      final res = await http.get(
        Uri.parse('https://api.openweathermap.org/data/2.5/forecast?q=$city,uk&APPID=$secretAPIKey'),
      );
      final data = jsonDecode(res.body);//converting json data into object
      if(data['cod']!='200'){ //status code check
        throw 'An unexpected error occurred';
      }
      // setState(() {
      //   temp = data['list'][0]['main']['temp'];
      // });

      return data;

    }
    catch(e){
      throw e.toString();
    }
    
  }

  @override
  void initState(){
    super.initState();
    weather = getCurrentWeather();
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title : Text('Weather App', 
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
        actions : [
          /* GestureDetector( //to make the refresh icon clickable
            onTap: (){}, //can also replace this with InkWell to give splashing effect on clicking
            child : Icon(Icons.refresh),
          ), */
          IconButton( //its preferred as it gives nice circular splashing effect
            onPressed: () {
              /* setState() is a local State Management solution used to rebuild/manage the state of the widgets
              of only 1 particular page */
              setState(() {
                weather = getCurrentWeather(); //its done for our requirement, because we want getWeather() to
                //be rebuilt on refereshing (generally not recommended by Flutter)
              });
            }, 
            icon: Icon(Icons.refresh),
          ),
        ],
      ),

      // if an application is restarted, temperature is shown as O K and then changes to actual temperature value
      //this is added to show loading staus instead of 0
      /* body: temp ==0 ? const CircularProgressIndicator() : */
      
        //FutureBuilder is very useful when we want to handle things in the future
        body : FutureBuilder(
          future: weather, //earlier when getWeather() was called directly, entire scaffold was gettingse rebuilt (lazy loading)
          // but now, only weather variable is called and hence getWeather() is called only once and doesn't get
          // rebuilt every time on calling setState()
          builder : (context,snapshot) {
            print(snapshot); //snapshot is a class that allows us to handle all the states in our app like data state, loading state, etc.
            print(snapshot.runtimeType);
            if(snapshot.connectionState==ConnectionState.waiting){
              return Center(child: CircularProgressIndicator.adaptive()); //to make it suitable as per IOS and android
            }
            if(snapshot.hasError){
              return Center(child: Text(snapshot.error.toString()));
            }

            final data=snapshot.data;

            final currentWeather=data?['list'][0];
            final temp=currentWeather['main']['temp'];
            final cloudStyle=currentWeather['weather'][0]['main'];

            final humidity=currentWeather['main']['humidity'];
            final pressure=currentWeather['main']['pressure'];
            final windSpeed=currentWeather['wind']['speed'];

            return Padding(
            padding: const EdgeInsets.all(16.0),
            child: SingleChildScrollView( //by default, its scrollable vertically
            scrollDirection: Axis.vertical,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start, //all the widgets in the column start from extreme left 
                //this can also be replaced by Align or alignment property inside Container widget
                children: [
                  //Main Card
                  SizedBox(
                    width: double.infinity,
                    child: Card(
                      elevation: 10,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                  
                      child: ClipRRect( //to give a perfect blending
                        borderRadius: BorderRadius.circular(16),
                        child: BackdropFilter( //to blur an image/card
                          filter: ImageFilter.blur( //implements Gaussian blur
                            sigmaX: 10,
                            sigmaY: 10,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Column(
                              children: [
                                Text(
                                  '$temp K',
                                  style: TextStyle(
                                    fontSize: 32,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 16,),
                                Icon(currentWeather=='Clouds' || currentWeather=='Rain' ? Icons.cloud : Icons.sunny, 
                                size: 64,),
                                const SizedBox(height: 16,),
                                Text(
                                  cloudStyle, style : TextStyle(
                                  fontSize: 20
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
              
                  const SizedBox(height: 20,),
                  const Text(
                    'Weather Forecast',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  //Weather Forecast cards
                  // SingleChildScrollView(
                  //   scrollDirection: Axis.horizontal,
                  //   child: Row(
                  //     children: [
                  //       for(int i=0;i<6;i++)
                  //         HourlyForecast(
                  //           time: data!['list'][i+1]['dt'].toString(),
                  //           icon: data['list'][i+1]['weather'][0]['main']=='Clouds' || data['list'][i+1]['weather'][0]['main']=='Rain' ? Icons.cloud : Icons.sunny,
                  //           temp: data['list'][i+1]['main']['temp'].toString()),
                  //     ],
                  //   ),
                  // ),

                  //when n is high in the for loop, all the 'n' widgets build at a time and hence has
                  //performance impact
                  //To overcome this issue, we use lazy loading - widgets get built/loaded as we scroll
                  //here widgets are built in demand

                  SizedBox(
                    height : 120,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: 6,
                      itemBuilder: (context, index) {
                      final hourlyWeather = data?['list'][index+1];
                      //parsing and converting dt into DateTime object, as required by DateFormat
                      final time = DateTime.parse(hourlyWeather['dt_txt']);
                      return HourlyForecast(
                        //DateFormat is provided by intl package
                        time: DateFormat.Hm().format(time), //00:00 format
                        icon: hourlyWeather['weather'][0]['main']=='Clouds' || hourlyWeather['weather'][0]['main']=='Rain' ? Icons.cloud : Icons.sunny, 
                        temp: hourlyWeather['main']['temp'].toString()
                        );
                      },
                    ),
                  ),

                  const SizedBox(height: 20,),
              
                  //Additional Information
                  const Text(
                    'Additional Information',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
          
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      AdditionalInformationItem(icon:Icons.water_drop, label:'Humidity', value: humidity.toString()),
                      AdditionalInformationItem(icon:Icons.air, label:'Wind Speed', value: windSpeed.toString()),
                      AdditionalInformationItem(icon:Icons.beach_access, label:'Pressure', value: pressure.toString()),
                    ],
                  )
                ],
              ),
            ),
          );
          },
        ),
      );
  }
}

