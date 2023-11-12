import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

class CategoryFilter extends StatefulWidget {
  const CategoryFilter({super.key});

  @override
  State<CategoryFilter> createState() => _CategoryFilterState();
}

class _CategoryFilterState extends State<CategoryFilter> {
  final List<CategoryI> categories = [
    CategoryI(id: 1, name: 'CategoryI 1'),
    CategoryI(id: 2, name: 'CategoryI 2'),
    CategoryI(id: 3, name: 'CategoryI 3'),
    CategoryI(id: 4, name: 'CategoryI 4'),
    CategoryI(id: 5, name: 'CategoryI 5'),
    CategoryI(id: 6, name: 'CategoryI 6'),
    CategoryI(id: 7, name: 'CategoryI 7'),
    CategoryI(id: 8, name: 'CategoryI 8'),
    CategoryI(id: 9, name: 'CategoryI 9'),
    CategoryI(id: 10, name: 'Category 10'),
  ];

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 50,
      width: 100.w,
      child: ListView.builder(
        shrinkWrap: true,
        scrollDirection: Axis.horizontal,
        itemCount: categories.length,
        itemBuilder: (BuildContext context, int index) {
          return GestureDetector(
            onTap: () {
              setState(() {
                categories[index].isSelected = !categories[index].isSelected;
              });
            },
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: CategoryCard(category: categories[index]),
            ),
          );
        },
      ),
    );
  }
}

class CategoryI {
  final int id;
  final String name;
  bool isSelected;

  CategoryI({required this.id, required this.name, this.isSelected = false});
}

class CategoryCard extends StatelessWidget {
  final CategoryI category;

  const CategoryCard({super.key, required this.category});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8.0),
      decoration: BoxDecoration(
        border:
            Border.all(color: category.isSelected ? Colors.blue : Colors.black),
        borderRadius: BorderRadius.circular(8.0),
        color: category.isSelected ? Colors.blue.withOpacity(0.3) : null,
      ),
      child: Text(category.name,
          style: TextStyle(
            color: category.isSelected ? Colors.blue : Colors.black,
          )),
    );
  }
}
