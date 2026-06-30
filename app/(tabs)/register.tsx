import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";

export default function RegisterScreen() {
const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Habit Tracker</Text>
        <Text style={styles.subtitle}>
          Build better habits every day.
        </Text>
      </View>

      {/* inputs */}
      <View style={styles.form}>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />


        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.registerButton} onPress={() => {
          // need finish this
        }}>
          <Text style={styles.registerText}>Register</Text>
        </Pressable>


      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Already have an account?</Text>

        <Pressable>
          <Text style={styles.signup}>Login</Text>
        </Pressable>
      </View>

    </View>
  );
}

const COLORS = { primary: '#2E7D32' };

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  header: {
    alignItems: "center",
    marginBottom: 50,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },

  form: {
    gap: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },

  registerButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  registerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  forgotPassword: {
    textAlign: "center",
    color: COLORS.primary,
    marginTop: 10,
  },

  footer: {
    marginTop: 40,
    alignItems: "center",
  },

  signup: {
    marginTop: 8,
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});