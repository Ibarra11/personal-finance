"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PotsProgressBar from "./PotsProgressBar";
import PotActions from "./PotActions";
import WithDrawPotDialog from "./WithdrawMoneyPotDialog";
import AddMoneyPotDialog from "./AddMoneyPotDialog";

import React from "react";
import { Pot } from "@/types";

export default function PotsCard({ id, totalSaved, target, name, theme }: Pot) {
  const progress = (Number(totalSaved) / Number(target)) * 100;

  return (
    <Card className="space-y-8">
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            style={{ backgroundColor: theme.color }}
            className="size-4 rounded-full"
          ></div>
          <h4 className="text-xl font-bold">{name}</h4>
        </div>
        <PotActions target={target} theme={theme} name={name} id={id} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Total Saved</p>
          <p className="text-2xl font-bold text-gray-900">${totalSaved}</p>
        </div>
        <div className="space-y-3">
          <PotsProgressBar color={theme.color} value={progress} />
          <div className="flex justify-between text-xs text-gray-500">
            <p className="font-bold">{progress.toFixed(2)}%</p>
            <p>Target of ${target}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <div className="flex-1">
          <AddMoneyPotDialog
            title={name}
            potId={id}
            totalSaved={Number(totalSaved)}
            target={Number(target)}
          />
        </div>
        <div className="flex-1">
          <WithDrawPotDialog
            title={name}
            potId={id}
            totalSaved={Number(totalSaved)}
            target={Number(target)}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
