import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import {Link} from "expo-router"
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import styles from "../../assets/styles/login.styles";
import COLORS from "../../constants/colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {}
  return (
    <View style={styles.container}>
      {/* Image */}
      <View style={styles.topIllustration}>
        <Image
          source={require("../../assets/images/Reading glasses-bro.png")}
          style={styles.illustrationImage}
          cachePolicy={"memory-disk"}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.formContainer}>
          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChange={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={styles.inputGroup}>
            <Text>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChange={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* BUTTON */}
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            {isLoading ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href={'/signup'} asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
