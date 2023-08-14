import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/queries/categoryQueries";
import { useAppTheme } from "@/src/contexts/preference";

export type CategoryType = {
  amharicDescription?: string;
  amharicName?: string;
  createdAt?: string;
  description?: string;
  id: string;
  name: string;
  parentId?: string;
  updatedAt?: string;
};

const AllCategory: CategoryType = {
  id: "afasfiahsofa",
  name: "ALL",
};

type Props = {
  selectedCategory: CategoryType;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
};

const CategoryList = (props: Props) => {
  const { data, error, refetch, loading } = useQuery(GET_CATEGORIES);
  const { theme } = useAppTheme();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (data && data.categories.items.length > 0) {
      setCategories([AllCategory, ...data.categories.items]);
    }
  }, [data]);

  const selectCategory = (category: any) => {
    props.setSelectedCategory(category);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    active: {
      backgroundColor: "#3CC949",
      color: "#FFF",
    },
    inactive: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.text,
    },
  });

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        width: "100%",
        minHeight: 50,
        maxHeight: 50,
        flex: 1,
        height: 120,
        padding: 10,
        borderRadius: 10,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <FlatList
        contentContainerStyle={{
          paddingRight: 20,
        }}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              selectCategory(item);
            }}
            style={[
              {
                backgroundColor: theme.colors.background,
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 10,
                // justifyContent: "flex-start",
                // alignItems: "center",
                borderWidth: props.selectedCategory.id !== item.id ? 1 : 0,
              },

              props.selectedCategory.id === item.id
                ? styles.active
                : styles.inactive,
            ]}
          >
            <Text
              style={[
                {
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#000",
                },
                {
                  color:
                    props.selectedCategory.id === item.id
                      ? styles.active.color
                      : styles.inactive.color,
                },
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default CategoryList;
