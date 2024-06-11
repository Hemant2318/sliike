import { StyleSheet, View } from "@react-pdf/renderer";
import React from "react";
import TableRow from "./TableRow";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const ItemsTable = ({ data }) => (
  <View style={styles.tableContainer}>
    {/*<TableHeader />*/}
    <TableRow items={data.items} />
    {/*<TableFooter items={data.items} />*/}
  </View>
);

export default ItemsTable;
