import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";

import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
    Company,
    JobAbout,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualificaitons", "Responsibilities"];

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refecth } = useFetch("job-details", {
        job_id: params.id,
    });

    console.log(params.id)

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = () => {};

    const displayTabContent = () => {
        switch (activeTab) {
            case "Qualificaitons":
                return (
                    <Specifics
                        title="Qualifications"
                        points={
                            data[0].job_highlights?.qualifications ?? ["N/A"]
                        }
                    />
                );
            case "About":
            case "Responsibilities":
            default:
                break;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <View style={{ paddingLeft: 15 }}>
                            <ScreenHeaderBtn
                                iconURL={icons.left}
                                dimension="60%"
                                handlePress={() => router.back()}
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ paddingRight: 15 }}>
                            <ScreenHeaderBtn
                                iconURL={icons.share}
                                dimension="60%"
                            />
                        </View>
                    ),
                    headerTitle: "",
                }}
            />

            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {isLoading ? (
                        <ActivityIndicator
                            size="large"
                            color={COLORS.primary}
                        />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : data.length === 0 ? (
                        <Text>No Data</Text>
                    ) : (
                        <View
                            style={{ padding: SIZES.medium, paddingBottom: 100 }}
                        >
                            <Company
                                companyLogo={data[0].company_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                            />
                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>
            </>
        </SafeAreaView>
    );
};

export default JobDetails;
