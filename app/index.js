import { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {
    Nearbyjobs,
    Popularjobs,
    ScreenHeaderBtn,
    Welcome,
} from "../components";

export default function Home() {
    const router = useRouter();
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.lightWhite,
            }}
        >
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.lightWhite,
                    },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <View style={{ paddingLeft: 15 }}>
                            <ScreenHeaderBtn
                                iconURL={icons.menu}
                                dimension="60%"
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ paddingRight: 15 }}>
                            <ScreenHeaderBtn
                                iconURL={images.profile}
                                dimension="100%"
                            />
                        </View>
                    ),
                    headerTitle: "",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
