import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/queries/categoryQueries";
import { useAppTheme } from "@/src/contexts/preference";
import { Category } from "@/src/types/models";
import { useLocalization } from "@/src/contexts/localization";

const AllCategory: Category = {
  id: "afasfiahsofa",
  name: "ALL",
  amharicDescription: "ሁሉም",
  amharicName: "ሁሉም",
  createdAt: "",
  updatedAt: "",
  description: "",
};

type Props = {
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
};

const CategoryList = (props: Props) => {
  const { theme } = useAppTheme();
  const { t, locale } = useLocalization();
  const [categories, setCategories] = useState<Category[]>([]);
  const { error, loading } = useQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      setCategories([AllCategory, ...data.categories.items]);
    },
    onError: (e: any) => {
      console.log(error, "is the error");
    },
  });

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
      backgroundColor: theme.colors.cardBackground,
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
                  fontWeight: "500",
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
              {locale.includes("en") ? item.name : item.amharicName}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default CategoryList;
