import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Check, X } from "lucide-react-native";
import {
  Button,
  Empty,
  Notice,
  Row,
  Screen,
  Section,
  T,
  Tag,
} from "@/components/ui";
import { useDemo } from "@/features/provider";
import { findPlace } from "@/data/catalog";
import { c } from "@/theme/tokens";
export default function Admin() {
  const { state, dispatch } = useDemo();
  const pending = state.campaigns.filter((c) => c.status === "pending");
  return (
    <Screen top={false}>
      <Tag text="OPERATIONS PREVIEW" />
      <T tone="display">A better day,{`\n`}behind the scenes.</T>
      <Notice text="All figures below describe this device’s demo session. They are not mall business KPIs or customer analytics." />
      <Row style={{ alignItems: "stretch" }}>
        {[
          { label: "In review", value: pending.length },
          {
            label: "Approved",
            value: state.campaigns.filter((c) => c.status === "approved")
              .length,
          },
          { label: "Claims", value: state.claims.length },
        ].map((x) => (
          <View
            key={x.label}
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: c.paper,
              borderRadius: 12,
              gap: 8,
            }}
          >
            <T tone="title">{x.value}</T>
            <T tone="small" color={c.muted}>
              {x.label}
            </T>
          </View>
        ))}
      </Row>
      <Section title="Campaign approval queue" />
      {pending.length ? (
        pending.map((campaign) => (
          <View
            key={campaign.id}
            style={{
              padding: 20,
              gap: 14,
              backgroundColor: c.paper,
              borderRadius: 16,
            }}
          >
            <Tag text="PENDING LOCAL REVIEW" />
            <T tone="title">{campaign.title}</T>
            <T>{findPlace(campaign.storeId)?.name}</T>
            <T tone="small" color={c.muted}>
              {campaign.note}
            </T>
            <Button
              label={`Approve ${campaign.title}`}
              icon={Check}
              onPress={() =>
                dispatch({
                  type: "review-campaign",
                  id: campaign.id,
                  approve: true,
                })
              }
            />
            <Button
              label={`Reject ${campaign.title}`}
              icon={X}
              variant="secondary"
              onPress={() =>
                dispatch({
                  type: "review-campaign",
                  id: campaign.id,
                  approve: false,
                })
              }
            />
          </View>
        ))
      ) : (
        <Empty
          title="All caught up"
          body="Create a campaign in the retailer studio to demonstrate the review flow."
        />
      )}
      <Button
        label="View consumer Offers"
        onPress={() => router.push("/offers")}
      />
      <Button
        label="Open retailer studio"
        variant="secondary"
        onPress={() => router.push("/demo/retailer")}
      />
      <Section title="Campaign history" />
      {state.campaigns
        .filter((c) => c.status !== "pending")
        .map((campaign) => (
          <View
            key={campaign.id}
            style={{
              gap: 8,
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderColor: c.line,
            }}
          >
            <T>{campaign.title}</T>
            <Tag text={campaign.status.toUpperCase()} />
            <T tone="small" color={c.muted}>
              {campaign.status === "approved"
                ? "Visible in Offers on this device."
                : "Not published. Create a revised campaign to resubmit."}
            </T>
          </View>
        ))}
    </Screen>
  );
}
