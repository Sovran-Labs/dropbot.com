"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { FlowMenu } from "@/config/FlowMenu";
import { blockchainToImg } from "@/utils/blockchainToImg";
import { protocolToImg } from "@/utils/protocolToImg";
import { FlowMenuItem } from "@/ts/interfaces/FlowMenuItem";
import { tokenToImg } from "@/utils/tokenToImg";
import { FlowMode } from "@/ts/enums/FlowModes";

export default function FlowsMenu(props: any) {
  const router = useRouter();

  return (
    <div>
      <div className="m-4 text-white text-3xl">Flows Menu</div>
      <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto items-stretch auto-cols-fr w-full">
        {FlowMenu.map((flow: FlowMenuItem, index: any) => {
          return (
            <div key={flow.id} className="p-4 max-w-xs">
              <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                <div className="flex items-center mb-2">
                  <h2 className="text-white dark:text-white text-lg font-medium">
                    {flow.name}{" "}
                    <small>
                      {flow.mode === FlowMode.MAINNET && (
                        <span className="text-yellow-400 text-xs">
                          {flow.mode}
                        </span>
                      )}
                      {flow.mode === FlowMode.TESTNET && (
                        <span className="text-white text-xs">{flow.mode}</span>
                      )}
                    </small>
                  </h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <p className="leading-relaxed text-base text-white dark:text-gray-300">
                    {flow.description}
                  </p>

                  <div className="mt-4 mb-4 flex flex-col space-y-1">
                    {flow.blockchains.length > 0 && (
                      <div className="flex space-x-2">
                        {/* Blockchains */}
                        <span>
                          <b>Chains</b>
                        </span>
                        {flow.blockchains?.map((b: string, i: number) => {
                          const conf = blockchainToImg(b);

                          return conf ? (
                            <span key={b}>
                              <Image
                                src={conf?.path}
                                alt=""
                                width="32"
                                height="32"
                                key={i}
                              />
                            </span>
                          ) : (
                            <span key={b}></span>
                          );
                        })}
                      </div>
                    )}
                    {flow.tokens.length > 0 && (
                      <div className="flex space-x-2">
                        {/* Tokens */}
                        <span>
                          <b>Tokens</b>
                        </span>
                        {flow.tokens?.map((p: string, i: number) => {
                          const conf = tokenToImg(p);

                          return conf ? (
                            <span key={p}>
                              <Image
                                src={conf?.path}
                                alt=""
                                width="32"
                                height="32"
                                key={i}
                              />
                            </span>
                          ) : (
                            <></>
                          );
                        })}
                      </div>
                    )}
                    {flow.protocols.length > 0 && (
                      <div className="flex space-x-2">
                        {/* Protocols */}
                        <span>
                          <b>Protocols</b>
                        </span>
                        {flow.protocols?.map((p: string, i: number) => {
                          const conf = protocolToImg(p);

                          return conf ? (
                            <Image
                              src={conf?.path}
                              alt=""
                              width="32"
                              height="32"
                              key={i}
                            />
                          ) : (
                            <></>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {flow.isLive && (
                    <button
                      onClick={() => {
                        router.push(
                          flow.chooseFlowRoute ||
                            `/admin/flowsMenu/chooseFlow/default?templateId=${flow.id}`
                        );
                      }}
                      className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      {flow.isLive ? "Choose Flow" : "Coming Soon..."}
                    </button>
                  )}

                  {!flow.isLive && (
                    <button
                      className={`rounded-md bg-indigo-400 opacity-50 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-default`}
                    >
                      Coming Soon...
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
