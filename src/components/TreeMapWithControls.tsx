import React, { useState, CSSProperties } from "react";
import { TreeMap, TreeNode, ColorRangeBehavior, TooltipPosition, ICustomTooltipProps } from "miles-tree-map";
import { worldMap as initialWorldMap } from "../consts/consts";
import CustomTooltip from "./CustomTooltip";

const TreeMapWithControls: React.FC = () => {
  const [data, setData] = useState<TreeNode>({ ...initialWorldMap }); // Ensure a new object reference
  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(initialWorldMap, null, 2));
  const [colorRange, setColorRange] = useState<string[]>(["#4ecdc4", "#ff6b6b"]);
  const [colorRangeBehavior, setColorRangeBehavior] = useState<ColorRangeBehavior>("heatmap");
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>("mouseRight");
  const [animationDuration, setAnimationDuration] = useState<number>(300);
  const [paddingInner, setPaddingInner] = useState<number>(5);
  const [borderRadius, setBorderRadius] = useState<number>(2);
  const [breadcrumbEnabled, setBreadcrumbEnabled] = useState<boolean>(true);
  const [backButtonEnabled, setBackButtonEnabled] = useState<boolean>(false);
  const [tooltipEnabled, setTooltipEnabled] = useState<boolean>(true);
  const [customTooltipEnabled, setCustomTooltipEnabled] = useState<boolean>(false);
  const [updateKey, setUpdateKey] = useState<number>(0); // Add a key to force re-rendering

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJson = event.target.value;
    setJsonInput(newJson);

    try {
      const parsedData = JSON.parse(newJson);
      // Create a completely new deep copy using JSON stringify/parse
      const deepCopy = JSON.parse(JSON.stringify(parsedData));
      setData(deepCopy);
      // Force a re-render of the TreeMap by updating the key
      setUpdateKey(prevKey => prevKey + 1);
      console.log("Parsed Data:", deepCopy);
    } catch (error) {
      console.error("Invalid JSON format", error);
    }
  };

  const handleColorChange = (index: number, value: string) => {
    const newColorRange = [...colorRange];
    newColorRange[index] = value;
    setColorRange(newColorRange);
  };

  // Custom tooltip style with transparent background
  const transparentTooltipStyle: React.CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(3px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "4px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "6px 8px",
    pointerEvents: "none",
    color: "white",
    maxWidth: "fit-content", // Auto-fit to content
    maxHeight: "230px"       // Increased to accommodate more children
  };

  // Custom tooltip renderer function
  const customTooltipRenderer = (props: ICustomTooltipProps) => {
    return <CustomTooltip {...props} />;
  };

  // Styles
  const styles: Record<string, CSSProperties> = {
    container: {
      display: "flex",
      height: "100vh",
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
    controlPanel: {
      flex: 1,
      padding: "20px",
      borderRight: "1px solid #e0e0e0",
      overflowY: "auto",
      backgroundColor: "#f9f9f9",
      boxShadow: "inset -2px 0 5px rgba(0,0,0,0.03)",
    },
    heading: {
      color: "#2c3e50",
      marginBottom: "25px",
      paddingBottom: "10px",
      borderBottom: "2px solid #3498db",
      fontWeight: 600,
    },
    section: {
      marginBottom: "25px",
      padding: "15px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: 600,
      marginBottom: "15px",
      color: "#3498db",
    },
    controlGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      fontWeight: 500,
      marginBottom: "5px",
      color: "#34495e",
    },
    input: {
      width: "100%",
      padding: "8px 10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      marginTop: "5px",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "8px 10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      marginTop: "5px",
      fontFamily: "monospace",
      minHeight: "360px",
      maxHeight: "600px",
      fontSize: "14px",
      boxSizing: "border-box",
      overflowY: "auto",
      resize: "vertical",
      wordBreak: "break-all",
    },
    select: {
      width: "100%",
      padding: "8px 10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      marginTop: "5px",
      fontSize: "14px",
      backgroundColor: "white",
    },
    colorInputGroup: {
      display: "flex",
      gap: "10px",
      marginTop: "5px",
    },
    colorInput: {
      minWidth: "40px",
      height: "40px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      cursor: "pointer",
    },
    checkbox: {
      marginLeft: "10px",
      transform: "scale(1.2)",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      fontWeight: 500,
      color: "#34495e",
    },
    treeMapContainer: {
      flex: 3,
      position: "relative",
      overflow: "hidden",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.controlPanel}>
        <h3 style={styles.heading}>TreeMap Controls</h3>
        
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Data Configuration</h4>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Data (JSON):</label>
            <textarea
              value={jsonInput}
              onChange={handleJsonChange}
              style={styles.textarea}
            />
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Appearance</h4>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Color Range:</label>
            <div style={styles.colorInputGroup}>
              {colorRange.map((color, index) => (
                <input
                  key={index}
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  style={styles.colorInput}
                  title={`Color ${index + 1}: ${color}`}
                />
              ))}
            </div>
          </div>
          
          <div style={styles.controlGroup}>
            <label style={styles.label}>Color Range Behavior:</label>
            <select
              value={colorRangeBehavior}
              onChange={(e) => setColorRangeBehavior(e.target.value as ColorRangeBehavior)}
              style={styles.select}
            >
              <option value="oneColor">One Color</option>
              <option value="gradient">Gradient</option>
              <option value="discrete">Discrete</option>
              <option value="transparent">Transparent</option>
              <option value="borderOnly">Border Only</option>
              <option value="random">Random</option>
              <option value="randomRangeColor">Random Range Color</option>
              <option value="wild">Wild</option>
              <option value="heatmap">Heatmap</option>
            </select>
          </div>
          
          <div style={styles.controlGroup}>
            <label style={styles.label}>Border Radius:</label>
            <input
              type="number"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              min="0"
              style={styles.input}
            />
          </div>
          
          <div style={styles.controlGroup}>
            <label style={styles.label}>Padding Inner:</label>
            <input
              type="number"
              value={paddingInner}
              onChange={(e) => setPaddingInner(Number(e.target.value))}
              min="0"
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Animation & Interaction</h4>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Animation Duration (ms):</label>
            <input
              type="number"
              value={animationDuration}
              onChange={(e) => setAnimationDuration(Number(e.target.value))}
              min="0"
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>UI Features</h4>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Tooltip Position:</label>
            <select
              value={tooltipPosition}
              onChange={(e) => setTooltipPosition(e.target.value as TooltipPosition)}
              style={styles.select}
            >
              <option value="mouseRight">Mouse Right</option>
              <option value="mouseTop">Mouse Top</option>
              <option value="mouseBottom">Mouse Bottom</option>
              <option value="fixedTopLeft">Fixed Top Left</option>
              <option value="fixedTopRight">Fixed Top Right</option>
              <option value="fixedBottomLeft">Fixed Bottom Left</option>
              <option value="fixedBottomRight">Fixed Bottom Right</option>
              <option value="fixedTopCenter">Fixed Top Center</option>
              <option value="fixedBottomCenter">Fixed Bottom Center</option>
              <option value="nodeTopLeft">Node Top Left</option>
              <option value="nodeTopRight">Node Top Right</option>
              <option value="nodeBottomLeft">Node Bottom Left</option>
              <option value="nodeBottomRight">Node Bottom Right</option>
              <option value="nodeTopCenter">Node Top Center</option>
              <option value="nodeBottomCenter">Node Bottom Center</option>
            </select>
          </div>
          
          <div style={styles.controlGroup}>
            <label style={styles.checkboxLabel}>
              <span>Tooltip Enabled:</span>
              <input
                type="checkbox"
                checked={tooltipEnabled}
                onChange={(e) => setTooltipEnabled(e.target.checked)}
                style={styles.checkbox}
              />
            </label>
          </div>
          
          <div style={styles.controlGroup}>
            <label style={styles.checkboxLabel}>
              <span>Use Custom Tooltip:</span>
              <input
                type="checkbox"
                checked={customTooltipEnabled}
                onChange={(e) => setCustomTooltipEnabled(e.target.checked)}
                style={styles.checkbox}
              />
            </label>
          </div>
          
          <div style={styles.controlGroup}>
            <label style={styles.checkboxLabel}>
              <span>Breadcrumb Enabled:</span>
              <input
                type="checkbox"
                checked={breadcrumbEnabled}
                onChange={(e) => setBreadcrumbEnabled(e.target.checked)}
                style={styles.checkbox}
              />
            </label>
          </div>
          
          <div style={styles.controlGroup}>
            <label style={styles.checkboxLabel}>
              <span>Back Button Enabled:</span>
              <input
                type="checkbox"
                checked={backButtonEnabled}
                onChange={(e) => setBackButtonEnabled(e.target.checked)}
                style={styles.checkbox}
              />
            </label>
          </div>
        </div>
      </div>
      
      <div style={styles.treeMapContainer}>
        <TreeMap
          key={updateKey}
          data={data}
          colorRange={colorRange}
          colorRangeBehavior={colorRangeBehavior}
          customTooltipPosition={tooltipPosition}
          animationDuration={animationDuration}
          borderRadius={borderRadius}
          paddingInner={paddingInner}
          breadcrumbEnabled={breadcrumbEnabled}
          backButtonEnabled={backButtonEnabled}
          tooltipEnabled={tooltipEnabled}
          tooltipComponentRender={customTooltipEnabled ? customTooltipRenderer : undefined}
          customTooltipStyle={customTooltipEnabled ? transparentTooltipStyle : undefined}
        />
      </div>
    </div>
  );
};

export default TreeMapWithControls;
