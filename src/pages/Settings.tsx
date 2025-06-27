import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";

const Settings: React.FC = () => {
  const [settings, setSettings] = React.useState({
    notifications: true,
    darkMode: false,
    analytics: true,
    autoSave: true,
  });

  const handleChange =
    (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({
        ...settings,
        [setting]: event.target.checked,
      });
    };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Settings
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>

          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications}
                  onChange={handleChange("notifications")}
                />
              }
              label="Enable Notifications"
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.darkMode}
                  onChange={handleChange("darkMode")}
                />
              }
              label="Dark Mode"
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Privacy Settings
          </Typography>

          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.analytics}
                  onChange={handleChange("analytics")}
                />
              }
              label="Analytics Tracking"
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.autoSave}
                  onChange={handleChange("autoSave")}
                />
              }
              label="Auto Save"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
