import { resolve } from "path";
import { Client, createClientAsync, IOptions } from "soap";
import { WsdlPathEnum } from "./wsdl-path.enum";

export type SoapClientParams = {
  wsdl: WsdlPathEnum;
  options?: IOptions;
  // url?: EndpointsEnum;
};

export class SoapClientFacade {
  private construct() {}

  /**
   * Geth the path for the WSDL file stored on the WSDL folder.
   *
   * @param wsdlFile
   * @param forceFolderPath
   * @returns Path of wsdl file
   */
  private static getWsdlPath(
    wsdlFile: string,
    forceFolderPath?: string
  ): string {
    return resolve(forceFolderPath ?? resolve(__dirname, "wsdl/"), wsdlFile);
  }

  public static async create<T extends Client>({
    wsdl,
    options,
  }: SoapClientParams): Promise<T> {
    return (await createClientAsync(
      SoapClientFacade.getWsdlPath(wsdl),
      options
    )) as T;
  }
}
