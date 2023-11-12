import 'package:flutter/material.dart';

class Product {
  final int id;
  final String name;
  final double price;
  int quantity;
  bool isSelected;
  final int categoryId;

  Product(
      {required this.id,
      required this.name,
      required this.price,
      this.quantity = 1,
      required this.categoryId,
      this.isSelected = false});
}

class ProductCard extends StatefulWidget {
  final Product product;

  const ProductCard({super.key, required this.product});

  @override
  State<ProductCard> createState() => _ProductCardState();
}

class _ProductCardState extends State<ProductCard> {
  @override
  Widget build(BuildContext context) {
    return Card(
      color: widget.product.isSelected ? Colors.blue.withOpacity(0.3) : null,
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 20.0,
          vertical: 10.0,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Checkbox(
                  value: widget.product.isSelected,
                  onChanged: (value) {
                    setState(() {
                      widget.product.isSelected = !widget.product.isSelected;
                      if (!widget.product.isSelected) {
                        widget.product.quantity = 1;
                      }
                    });
                  },
                ),
                const SizedBox(width: 10),
                Column(
                  children: [
                    Text(widget.product.name),
                    const SizedBox(height: 5),
                    Text('\$${widget.product.price.toStringAsFixed(2)}'),
                  ],
                ),
              ],
            ),
            (widget.product.isSelected)
                ? SizedBox(
                    child: Row(
                      children: [
                        IconButton(
                          icon: const Icon(Icons.remove),
                          onPressed: () {
                            // Decrease quantity when the minus button is pressed
                            if (widget.product.quantity > 1) {
                              widget.product.quantity--;
                            }
                          },
                        ),
                        Text('${widget.product.quantity}'),
                        IconButton(
                          icon: const Icon(Icons.add),
                          onPressed: () {
                            // Increase quantity when the plus button is pressed
                            widget.product.quantity++;
                          },
                        ),
                      ],
                    ),
                  )
                : SizedBox(
                    child: Text("x${widget.product.quantity}"),
                  ),
          ],
        ),
      ),
    );
  }
}
