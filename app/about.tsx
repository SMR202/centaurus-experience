import React from "react";
import { Linking, View } from "react-native";
import { Button, Notice, Screen, Section, T, Tag } from "@/components/ui";
import { c } from "@/theme/tokens";
export default function About() {
  return (
    <Screen top={false}>
      <Tag text="INDEPENDENT CONCEPT · OCTOBER 2026" />
      <T tone="display">Made for a conversation.</T>
      <T>
        This prototype explores a possible Centaurus visitor experience. It is
        not an official mall app and does not represent a production service.
      </T>
      <Section title="What’s real, what’s illustrative" />
      <T>
        Merchant names were checked against the official mall directory. A few
        floors are directory-sourced; others await confirmation. Every map
        coordinate, route, offer, film, event, membership benefit and
        operational figure is illustrative.
      </T>
      <Notice text="Never use this map for real navigation or emergencies. Use mall signs and staff guidance." />
      <Section title="Your privacy" />
      <T>
        Saved places, demo vouchers, parking and preferences are stored on this
        device. No account, analytics, location tracking, camera, contacts or
        real push notifications are used. Reset demo clears visit data but
        remembers tour dismissal. Opening a source link visits an external
        website.
      </T>
      <Section title="Photography & credits" />
      <View style={{ gap: 12 }}>
        <T tone="small">
          Centaurus architecture: Khaqan Ibrahim Chopa, CC BY-SA 4.0. Resized to
          WebP and cropped in layout; the adapted photo remains under CC BY-SA
          4.0.
        </T>
        <Button
          label="Architecture source & license"
          variant="secondary"
          onPress={() => {
            void Linking.openURL(
              "https://commons.wikimedia.org/wiki/File:Centaurus_mall_islamabad.jpg",
            );
          }}
        />
        <T tone="small">
          Coffee: Nathan Dumlao, CC0 1.0, via Wikimedia Commons. Pizza: Ivan
          Torres, Unsplash License. Photos are category editorials, not retailer
          premises or products.
        </T>
        <Button
          label="Coffee source"
          variant="secondary"
          onPress={() => {
            void Linking.openURL(
              "https://commons.wikimedia.org/wiki/File:Nathan_Dumlao_2017-05-26_(Unsplash).jpg",
            );
          }}
        />
        <Button
          label="Dining photo source"
          variant="secondary"
          onPress={() => {
            void Linking.openURL(
              "https://unsplash.com/photos/cheese-pizza-with-tomatoes-and-rosemary-MQUqbmszGGM",
            );
          }}
        />
        <T tone="small">
          DM Sans and Cormorant Garamond: SIL Open Font License. Lucide icons:
          ISC. Fictional posters and tower illustrations are original, released
          under CC0. Brand logos, storefronts and campaigns remain copyrighted
          by their owners.
        </T>
      </View>
      <Section title="Brand sources" />
      <T tone="small">
        Logos and storefronts come from the official Centaurus directory.
        Campaign photography comes from SAPPHIRE and Outfitters, checked 10
        October 2026. Included for this private pitch; no open license or
        production publication permission has been established.
      </T>
      <Button
        label="SAPPHIRE official collection"
        variant="secondary"
        onPress={() => {
          void Linking.openURL("https://pk.sapphireonline.pk/");
        }}
      />
      <Button
        label="Outfitters official collection"
        variant="secondary"
        onPress={() => {
          void Linking.openURL("https://outfitters.com.pk/");
        }}
      />
      <Section title="Directory sources" />
      <Button
        label="Official Centaurus brand directory"
        variant="secondary"
        onPress={() => {
          void Linking.openURL("https://thecentaurusmall.com/brands/");
        }}
      />
      <Button
        label="Official shop directory & floors"
        variant="secondary"
        onPress={() => {
          void Linking.openURL("https://thecentaurusmall.com/team_group/shop/");
        }}
      />
      <T tone="small" color={c.muted}>
        Production mapping, indoor sensors, retailer integrations, booking,
        payments, verified rewards, ANPR parking, real group location and AI
        recommendations require separate scope and validation.
      </T>
    </Screen>
  );
}
