interface WalletBalance {
  currency: string;
  amount: number;
  //blockchain: string; => need declare to improving type safety in line 67, 68
}

// delete code below because duplicate with declare type with interface above and property formatted not used (detail on line 93)
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // This function (line 33) excute both filter and sort this will make maintenance difficult, and lack of type blockchain, we should re-write
  // This is function after refactor
  // const getPriority = (blockchain: string): number => {
  //   const priorityMap = {
  //     Osmosis: 100,
  //     Ethereum: 50,
  //     Arbitrum: 30,
  //     Zilliqa: 20,
  //     Neo: 20,
  //   };
  //   return priorityMap[blockchain] || -99;
  // };

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  /* 
    function sortedBalances:
    - lhsPriority is wrong, i think this is typo, it must be balancePriority, but variable balancePriority unnecessary declaration
    - use logical operator to make condition for filter function
    - lsh and rhs need replaced with more descriptive names 
    - remove prices on dependency, memo hook depend on prices unnecessary because it will cause re-computations if prices changes often but array balance remain the same.
    - with condition sort, we have if leftPriority > rightPriority ? -1 : 1, and desired behavior is high priority to lower priority but if leftP equal rightP and we not check this case,
    it can has result sort messy. So i refactor it become to 
      rightP - leftP => if positive value, right to left , negative value left to right and 0 the order left and right unchanged

    - I will refactor like this: 
     const sortedBalances = useMemo(() => {
      return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .sort((left: WalletBalance, right: WalletBalance) => {
        const leftPriority = getPriority(left.blockchain);
        const rightPriority = getPriority(right.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]);
  */
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  // line 7 => property formatted used on function but function not used.
  // Delete function formattedBalances because not used
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount; // Check not found if prices undefined
      // const formattedBalances = balance.amount.toFixed(); add function formattedBalances this line

      return (
        <WalletRow
          className={classes.row} // I think this line used to add style with module style, need set name clear like styles.row
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          // formattedBalances={formattedBalances} used function formattedBalances
        />
      );
    }
  );

  /*
    const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] ? prices[balance.currency] * balance.amount : 0;
    const formattedBalances = balance.amount.toFixed();
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedBalances={formattedBalances}
        />
      );
    });
  */

  return <div {...rest}>{rows}</div>;
};

// missing code export 
// export default WalletPage;
