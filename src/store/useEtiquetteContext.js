import { useContext } from "react";
import { EtiquetteContext } from "./EtiquetteContext";

export function useEtiquetteContext() {
  return useContext(EtiquetteContext);
}