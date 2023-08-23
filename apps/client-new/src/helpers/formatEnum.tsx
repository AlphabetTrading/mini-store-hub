const formatEnumValue = (enumValue: string): string => {
  return (
    enumValue.charAt(0) + enumValue.slice(1).toLowerCase().replace(/_/g, " ")
  );
};
export default formatEnumValue;
