import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type DashboardProps = {
    route: RouteProp<MainStackParamList, "Dashboard">,
    navigation: FrameNavigationProp<MainStackParamList, "Dashboard">,
};

export function DashboardScreen({ navigation }: DashboardProps) {
    return (
        <gridLayout rows="auto, *, auto" className="p-4">
            {/* Stats Overview */}
            <stackLayout row="0" className="mb-4">
                <label className="text-2xl font-bold">Dashboard</label>
                <gridLayout columns="*, *, *" className="text-center mt-2">
                    <stackLayout col="0" className="bg-green-100 p-2 rounded-lg m-1">
                        <label className="font-bold">15</label>
                        <label>Items</label>
                    </stackLayout>
                    <stackLayout col="1" className="bg-yellow-100 p-2 rounded-lg m-1">
                        <label className="font-bold">3</label>
                        <label>Expiring</label>
                    </stackLayout>
                    <stackLayout col="2" className="bg-blue-100 p-2 rounded-lg m-1">
                        <label className="font-bold">5</label>
                        <label>Recipes</label>
                    </stackLayout>
                </gridLayout>
            </stackLayout>

            {/* Main Content */}
            <scrollView row="1" className="mb-4">
                <stackLayout>
                    <label className="text-xl font-bold mb-2">Recent Items</label>
                    {/* Sample Items - Replace with actual data */}
                    <gridLayout className="bg-white p-3 rounded-lg mb-2" columns="*, auto">
                        <label col="0">Milk</label>
                        <label col="1" className="text-red-500">Expires in 2 days</label>
                    </gridLayout>
                    <gridLayout className="bg-white p-3 rounded-lg mb-2" columns="*, auto">
                        <label col="0">Eggs</label>
                        <label col="1" className="text-green-500">Fresh</label>
                    </gridLayout>
                </stackLayout>
            </scrollView>

            {/* Bottom Actions */}
            <gridLayout row="2" columns="*, *" className="gap-2">
                <button 
                    col="0"
                    className="bg-green-500 text-white p-4 rounded-lg"
                    onTap={() => navigation.navigate("AddItem")}
                >
                    Add Item
                </button>
                <button 
                    col="1"
                    className="bg-blue-500 text-white p-4 rounded-lg"
                    onTap={() => navigation.navigate("MealSuggestions")}
                >
                    Meal Ideas
                </button>
            </gridLayout>
        </gridLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 16,
    },
});