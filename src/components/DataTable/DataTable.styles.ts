import type { SxProps, Theme } from "@mui/material/styles";

/**
 * Styles for the main table container
 */
export const tableContainerStyles: SxProps<Theme> = {
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1,
  overflow: "hidden",
  "& .MuiTableHead-root": {
    backgroundColor: "action.hover",
  },
};

/**
 * Gets styles for header cells
 */
export const getHeaderCellStyles = (isLoading: boolean): SxProps<Theme> => ({
  fontWeight: "bold",
  backgroundColor: "action.hover",
  opacity: isLoading ? 0.6 : 1,
  borderBottom: "2px solid",
  borderBottomColor: "divider",
  whiteSpace: "nowrap",
  padding: { xs: 1, sm: 1.5 },
});

/**
 * Gets styles for body cells
 */
export const getBodyCellStyles = (isLoading: boolean): SxProps<Theme> => ({
  padding: { xs: 1, sm: 1.5 },
  opacity: isLoading ? 0.6 : 1,
  borderBottom: "1px solid",
  borderBottomColor: "divider",
  verticalAlign: "top",
});

/**
 * Styles for table rows
 */
export const tableRowStyles: SxProps<Theme> = {
  "&:nth-of-type(even)": {
    backgroundColor: "action.hover",
  },
  "&:hover": {
    backgroundColor: "action.selected",
  },
};

/**
 * Styles for loading container
 */
export const loadingContainerStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 200,
  width: "100%",
};

/**
 * Styles for header content
 */
export const headerContentStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

/**
 * Styles for truncation indicator
 */
export const truncationIndicatorStyles: SxProps<Theme> = {
  fontSize: "0.75rem",
  opacity: 0.7,
  fontStyle: "italic",
};

/**
 * Styles for boolean chip
 */
export const booleanChipStyles: SxProps<Theme> = {
  fontSize: "0.75rem",
  height: 24,
  minWidth: 60,
};

/**
 * Styles for date values
 */
export const dateValueStyles: SxProps<Theme> = {
  fontFamily: "monospace",
  fontSize: "0.875rem",
};

/**
 * Styles for number values
 */
export const numberValueStyles: SxProps<Theme> = {
  fontFamily: "monospace",
  textAlign: "right",
  fontSize: "0.875rem",
};

/**
 * Styles for text values
 */
export const textValueStyles: SxProps<Theme> = {
  fontSize: "0.875rem",
  lineHeight: 1.4,
};

/**
 * Styles for alert messages
 */
export const alertStyles: SxProps<Theme> = {
  width: "100%",
  mb: 2,
};
